import { array } from 'vue-types';
import tree from '../../components/tree';
import { arrayInstrumentations, modifyArrayFunction } from './array';
import { proxyRefs } from './ref'

export type Effect = {
    (): void;
};
export type EffectFn = Effect & {
    deps: Set<Effect>[];
    options: Options;
};
type Data = {
    text: string;
    index: number;
    name: string;
};
type Options = {
    scheduler?: (fn?: Effect) => void; // 这个scheduler设计的太灵活了!!! 用户可以根据自己的需求来执行函数
    lazy?: boolean;
};

const triggerType = {
    ADD: 'ADD',
    SET: 'SET',
    DELETE: 'DELETE',
};
// effect注册函数
let effectiveFunction: EffectFn;
let effectStack: EffectFn[] = [];

const ITERATE_KEY = Symbol();
const shouldTrack = (method: string) => {
    return !modifyArrayFunction.includes(method);
};

export function effect(fn: Effect, options?: Options) {
    const effectFn: EffectFn = () => {
        // 如果effect是嵌套的，那么始终获取的是最内层的effect函数，后续的更新也只会执行最内层的effect
        // effectiveFunction = effectFn;
        cleanup(effectFn as EffectFn);
        effectiveFunction = effectFn;

        // effect函数嵌套时，将effecFn都放栈中，执行一个就pop出来，始终保持最新的是当前依赖的函数在执行
        effectStack.push(effectFn);

        // 这里的设计太棒了！执行时会被get操作拦截，然后收集当前key的effectFn，
        // 赋值的时候，会再次执行effectFn
        const res = fn(); // 执行get操作，收集依赖,
        // res: 副作用函数的返回值, 将值交给用户侧去处理, 对computed这种函数来使用的

        effectStack.pop(); // 依赖收集完毕，弹出当前函数

        // 2022-5-25 10:30 不要也没发现什么问题,将栈顶最新的依赖函数复制给effectiveFunction
        effectiveFunction = effectStack[effectStack.length - 1];
        // 2022-5-25 11:45 不要上面这一句发现了bug: 嵌套的函数，更新数据的时候无法触发依赖函数的执行,
        // 因为「依赖函数」的执行, 需要判断当前的依赖函数,跟执行的函数不是同一个

        return res;
    };

    effectFn.deps = [];
    options && (effectFn.options = options);
    !options?.lazy && effectFn();

    return effectFn;
}
function cleanup(effectFn: EffectFn) {
    // 这一步其实是将执行完的函数从依赖函数中清除，get的时候重新收集依赖，避免不使用的数据一直有响应式
    for (let index = 0; index < effectFn.deps.length; index++) {
        const dep = effectFn.deps[index];
        dep.delete(effectFn);
    }

    effectFn.deps.length = 0;
}

const bucket = new WeakMap();
const effectiveProxyMap = new Map();

const data: Data = { text: 'hello world', index: 1, name: 'maggie' };
function readonly(obj: object, isShallow = false) {
    return effective(obj, isShallow, true);
}
export function createEffective(
    obj: object,
    isShallow = false,
    isReadonly = false
) {
    // 缓存每个对象的 proxy 对象, 因为不缓存, 对象嵌套的情况在每次获取的时候,
    // 都会去创建新的代理对象, 导致像includes这样的函数取值不准确
    const exisitionProxy = effectiveProxyMap.get(obj);
    if (exisitionProxy) return exisitionProxy;
    const proxy = effective(obj, isShallow, isReadonly);
    // const proxyAlias = proxyRefs(proxy);
    effectiveProxyMap.set(obj, proxy);
    return proxy;
}
export function effective(obj: object, isShallow = false, isReadonly = false) {
    return new Proxy(obj, {
        get(target: object, property: string, receiver) {
            const res = Reflect.get(target, property, receiver);

            // 增加一个属性, 用来获取当前代理的对象的original object
            if (property === 'raw') {
                return target;
            }


            if (Array.isArray(target) && arrayInstrumentations[property]) {
                return Reflect.get(arrayInstrumentations, property, receiver);
            }


            // symbol 是数组使用for ... of 获取属性时会调用的 Symbol.iterator
            if (!isReadonly && typeof property !== 'symbol') {
                track(target, property);
            }

            if (isShallow) return res;
            // 将target函数封装，使得依赖收集和值的获取逻辑上分离
            if (typeof res === 'object' && res !== null) {
                return isReadonly ? readonly(res) : createEffective(res);
            }
            // effect应该是用户传进来的函数,那么名称不应该写死
            // effectiveFunction && bucket.add(effectiveFunction);
            return res;
        },
        set(target: Data, property: string, newVal: any, receiver): any {
            let res;
            // 数组复用这一段, 未像书中所说给数组单独增加一个判断条件
            const type = Object.prototype.hasOwnProperty.call(target, property)
                ? triggerType.SET
                : triggerType.ADD;
            let oldVal = target[property];

            res = Reflect.set(target, property, newVal, receiver);

            // original object === proxy pbject时, 执行赋值操作
            // 这种情况适用于原型链中, 由原型引起的更新  详见test3.ts/
            // 原型形中没有的属性，赋值的时候，也会先去读去父
            if (target === receiver.raw) {

                // 新旧值不相等才触发更新,后一个判断条件是为了避免NaN这种情况
                if (
                    oldVal !== newVal &&
                    (oldVal === oldVal || newVal === newVal)
                ) {
                    trigger(target, property, type, newVal);
                }
            }

            // receiver可以理解成this, 需要手动传入, 保证在用户侧使用this时, 也是指向的代理对象
            return res;
        },
        // in操作拦截
        has(target, property) {
            track(target, property);
            return Reflect.has(target, property);
        },

        // for...in循环操作拦截
        ownKeys(target) {
            track(target, Array.isArray(target) ? 'length' : ITERATE_KEY);
            return Reflect.ownKeys(target);
        },
        deleteProperty(target, property) {
            const hadKey = Object.prototype.hasOwnProperty.call(
                target,
                property
            );

            const res = Reflect.deleteProperty(target, property);

            if (hadKey && res) {
                trigger(target, property, triggerType.DELETE);
            }
            return res;
        },
    });
}

export function track(target: object, property: string) {
    if (Array.isArray(target) && shouldTrack(property)) return;
    if (!effectiveFunction) return;

    // 将需要使用响应数据的data存起来，value是一个Map，用来存储其属性对应的effect函数
    let depsMap = bucket.get(target); // Map
    if (!depsMap) {
        // 很巧妙，用括号表达式对depsMap重新赋值，一行解决
        bucket.set(target, (depsMap = new Map()));
    }
    // 查找target属性的property对应的effect函数，也就是我们需要收集的依赖
    let deps = depsMap.get(property); // Set
    if (!deps) {
        depsMap.set(property, (deps = new Set<Effect>()));
    }

    deps.add(effectiveFunction);
    effectiveFunction.deps.push(deps);
}

export function trigger(
    target: object,
    property: string,
    type: string,
    newVal?: any
) {
    const depsMap = bucket.get(target); // Map
    if (!depsMap) return;

    const effects = depsMap.get(property); // Set
    const newEffects = new Set();
    const add = (fn) => {
        newEffects.add(fn);
    };

    effects && effects.forEach(add);
    if (Array.isArray(target)) {
        // 针对直接对length赋值的情况
        if (property === 'length') {
            depsMap.forEach((effect, key) => {
                if (key >= newVal) {
                    effect.forEach(add);
                }
            });
        }
        if (type === triggerType.ADD) {
            // effect中使用length来读取数组的长度, effect外使用超过数组长度的角标来赋值参见test5中的列子
            const lengthEffects = depsMap.get('length');
            lengthEffects && lengthEffects.forEach(add);
        }
    }
    if (type === triggerType.ADD || type === triggerType.DELETE) {
        // for ... in 遍历读取数据的时候使用
        const iterateEffects = depsMap.get(ITERATE_KEY);
        iterateEffects && iterateEffects.forEach(add);
    }

    const asideFunction = (fn) => {
        // 避免a++在依赖函数里, 造成无线循环：在读取的时候，又给变量赋值
        if (effectiveFunction !== fn) {
            if (
                (fn as EffectFn).options &&
                (fn as EffectFn).options.scheduler
            ) {
                fn.options.scheduler(fn);
            } else {
                (fn as EffectFn)();
            }
        }
    };
    newEffects && newEffects.forEach((fn) => asideFunction(fn));

    return true;
}

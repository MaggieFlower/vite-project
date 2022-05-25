import { array } from 'vue-types';

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

// effect注册函数
let effectiveFunction: EffectFn;
let effectStack: EffectFn[] = [];

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
        // 2022-5-25 11:45 不要上面这一句发现了bug: 更新数据的时候无法触发依赖函数的执行,
        // 依赖函数的执行, 需要判断当前的依赖函数,跟执行的函数不是同一个

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

const data: Data = { text: 'hello world', index: 1, name: 'maggie' };
export const proxyData = new Proxy<Data>(data, {
    get(target: object, property: string) {
        // 将target函数封装，使得依赖收集和值的获取逻辑上分离
        track(target, property);
        // effect应该是用户传进来的函数,那么名称不应该写死
        // effectiveFunction && bucket.add(effectiveFunction);
        return Reflect.get(target, property);
    },
    set(target: Data, property: string, newVal: any): boolean {
        Reflect.set(target, property, newVal);
        trigger(target, property);
        return true;
    },
});

export function track(target: object, property: string) {
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

export function trigger(target: object, property: string) {
    const depsMap = bucket.get(target); // Map
    if (!depsMap) return;
    const effects = depsMap.get(property); // Set

    const newEffects = new Set(effects);
    newEffects.forEach((fn) => {
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
    });
    return true;
}

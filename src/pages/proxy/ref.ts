import { createEffective } from './reactive.ts';
type ReferenceValue = number | boolean | string

export function ref(value: ReferenceValue) {
    const wrapper = {
        "value": value
    };
    Object.defineProperty(wrapper, '__v_isRef__', { value: true });

    // 给原始数据添加标识
    return createEffective(wrapper);
}

function toRef(obj: object, key: string) {
    const wrapper = {
        get value() {
            return obj[key];
        },
        set value(val) {
            obj[key] = val;
        }
    }
    // 给原始数据添加标识
    Object.defineProperty(wrapper, '__v_isRef__', { value: true });
    return wrapper;
}

export function toRefs(obj: object) {
    // debugger
    const wrapper = {};
    for (let key in obj) {
        wrapper[key] = toRef(obj, key);
    }
    return wrapper;
}


export function proxyRefs(target) {
    return new Proxy(target, {
        get(target, property, receiver) {
            const res = Reflect.get(target, property, receiver);
            if (target.__v_isRef__) {
                return res.value;
            }
            return res;
        },
        set(target, property, newVal, receiver) {
            if (target.__v_isRef__) {
                const res = target[property];
                res.value = newVal;
                return true;
            }

            return Reflect.set(target, property, newVal, receiver);
        }
    })
}
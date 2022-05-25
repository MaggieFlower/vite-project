import { effect } from './reactive.ts';
type Getter = () => any | string | number;
type Cb = (newVal: any, oldVal: any) => void;
type Options = {
    immediate?: boolean;
};

export function watch(source: Getter, cb: Cb, options: Options) {
    let getter;
    if (typeof source === 'function') {
        getter = source;
    } else {
        getter = () => traverse(source);
    }

    let newVal: any, oldVal: any;
    const effectFn = effect(getter, {
        scheduler: job,
        lazy: true,
    });

    function job() {
        newVal = effectFn();
        cb(newVal, oldVal);
        oldVal = newVal;
    }

    if (options && options.immediate) {
        job();
    } else {
        oldVal = effectFn();
    }
}

function traverse(source: Getter, seen = new Set()) {
    if (typeof source !== 'object' || source === null || seen.has(source))
        return;

    seen.add(source);

    // 只考虑对象
    for (const key in source as Getter) {
        traverse(source[key], seen);
    }

    return source;
}

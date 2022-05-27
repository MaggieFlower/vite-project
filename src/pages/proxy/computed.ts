import { effect, track, trigger } from './reactive.ts';
type CmputedFn = () => any;

export function computed(fn: CmputedFn) {
    let cache: any,
        dirty = true; // '脏' 意味着数据有更新, 需要重新计算
    const effectFn = effect(fn, {
        lazy: true,
        scheduler() {
            dirty = true;
            trigger(obj, 'value');
        },
    });
    const obj = {
        get value() {
            if (dirty) {
                cache = effectFn();
                dirty = false;
            }
            track(obj, 'value');

            return cache;
        },
    };
    return obj;
}

type Obj = {
    searchElement: any;
    fromIndex?: number | undefined;
};
type ArrayIns = {
    includes?: (args: Obj[]) => boolean;
    indexOf?: (args: Obj[]) => boolean;
    lastIndexOf?: (args: Obj[]) => boolean;
};
export const arrayInstrumentations: ArrayIns = {};

['includes', 'indexOf', 'lastIndexOf'].forEach((method) => {
    // 直接在这里获取原始方法, 不去另外定义, 好想法👍
    const originMethod = Array.prototype[method];
    arrayInstrumentations[method] = function (...args: Obj[]) {
        let res = originMethod.apply(this, args);

        // 代理对象上不存在
        if (res === false) {
            // 去原始对象上找
            res = originMethod.apply(this.raw, args);
        }
        return res;
    };
});

export const modifyArrayFunction = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
];
modifyArrayFunction.forEach((method) => {
    const originMethod = Array.prototype[method];
    arrayInstrumentations[method] = function (...args) {
        let res = originMethod.apply(this, args);
        return res;
    };
});

import { ref, toRefs, proxyRefs } from './ref.ts';
import { effect, createEffective } from './reactive.ts';

// 测试ref
let num = ref(5);
const numCopy = createEffective({ num });
// const b = proxyRefs(numCopy)
// console.log('numCopy: ', numCopy.num)

effect(() => {
    console.log('numCopy: ', numCopy.num)
});
numCopy.num = 100;

// const obj = createEffective({foo: 1, bar: 2});
// const newObj = {...toRefs(obj)};


// effect(() => {
//     // newObj.foo.value 读取的是 obj.foo 的值， 因此当 obj.foo 变化的时候， 可以触发副作用函数
//     console.log('obj.foo: ', newObj.foo.value);
// });
// obj.foo = 200



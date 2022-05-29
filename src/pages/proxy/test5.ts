/**
 * 本测试用例包含数组在响应式中的表现
 */
import { createEffective, effect } from './reactive.ts';

const arr = createEffective(['foor', 'barr']);

// 1 修改 length 长度, 反向影响数据
// effect(() => {
//     console.log(arr[0]);
// });

// arr.length = 0;

// 2 修改角标数据, 反向影响 length
// effect(() => {
//     console.log(arr.length);
// });

// 需要在trigger中找到length相关的副作用函数, 保证操作大于数组长度的数组角标也会触发副作用函数 长度的改变
// arr[2] = 'nana';
// arr[1] = 'maggie';

// 3 for ... in遍历循环
// effect(() => {
//     for (let attr in arr) {
//         console.log('attr: ', arr[attr]);
//     }
// });

// arr[1] = 'null';
// arr[2] = 'object';

// arr.length = 1;

// 4 数组里面包含对象, includes操作

// const obj = {};
// const arr2 = createEffective([obj]);

// console.log(arr2.includes(arr2[0]));

// 5 push操作

effect(() => {
    arr.push(1);
});
effect(() => {
    arr.push(2);
});

console.log(arr);

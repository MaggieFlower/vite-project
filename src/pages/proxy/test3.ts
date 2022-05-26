/**
 * 此脚本包含原型链更新数据的测试
 */
import { effective, effect } from './reactive.ts';
const obj = { name: 'obj' };
const proto = { name: 'proto', sex: 'male' };
const child = effective(obj);

const parent = effective(proto);
Object.setPrototypeOf(child, parent);

effect(() => {
    console.log('child.sex: ', child.sex);
});

child.sex = 2;

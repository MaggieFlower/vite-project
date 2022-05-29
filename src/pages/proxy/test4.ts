/**
 * 此用例包含深浅代理的测试
 */
import { effective, effect } from './reactive.ts';
const obj = { student: { name: 'maggie', age: '18', sex: 'female' } };
const school = effective(obj);

const obj2 = { student: { name: 'maggie', age: '18', sex: 'female' } };
const school2 = effective(obj2, true);

effect(() => {
    console.log(' school.student.name: ', school.student.name);
});

effect(() => {
    console.log(' school2.student.name: ', school2.student.name);
});

setTimeout(() => {
    school.student.name = 'oubenben';
    school2.student.name = 'oubenben';
}, 1000);

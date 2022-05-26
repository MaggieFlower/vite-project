/**
 * 本测试脚本包含in操作读取对象
 */
import { effective, effect } from './reactive.ts';
type Data = {
    foo: string;
};

const data: Data = {
    foo: 'foo',
};

const proxyData = effective(data);

effect(() => {
    for (let key in proxyData) {
        console.log('key value: ', proxyData[key]);
    }
});

setTimeout(() => {
    proxyData.bar = 'bar';
    proxyData.foo = 'new Foo';
}, 2000);

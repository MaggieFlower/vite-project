/**
 * 本测试脚本包含proxy代理对象一般的独取操作、computed、watch、scheduler
 */

import { effect, effective } from './reactive';
import { flushQueue, jobQueue } from './helpers.ts';
import { computed } from './computed.ts';
import { watch } from './watch.ts';

const data = { text: 'hello world', index: 1, name: 'maggie' };
export const proxyData = effective(data);
export const handleValue = () => {
    const el = document.querySelector('.proxy');
    (el as HTMLElement).innerHTML = proxyData.name;
};

export function handleInputEvent(event: Event) {
    proxyData.name = (event.target as HTMLInputElement).value;
}

// function changeNumber() {
//     console.log('proxyData.index: ', Promise.resolve(proxyData.index));
// }

// effect(changeNumber, {
//     scheduler(fn) {
//         jobQueue.add(fn);
//         flushQueue();
//     },
// });
const sumVal = computed(() => proxyData.name + proxyData.index);

effect(() => {
    // console.log(sumVal.value);
});

watch(
    () => proxyData.index,
    (newVal: any, oldVal: any) => {
        // console.log('变化了', newVal, oldVal);
    },
    {
        immediate: true,
    }
);

proxyData.index++;

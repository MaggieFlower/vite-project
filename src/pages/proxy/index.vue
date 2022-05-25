<template>
    <div>
        <p class="proxy"></p>
        <input
            type="input"
            placeholder="请输入你想要的文字"
            @input="handleInputEvent"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { proxyData, effect } from './reactive';
import { flushQueue, jobQueue } from './helpers.ts';
import { computed } from './computed.ts';
import { watch } from './watch.ts';
const handleValue = () => {
    const el = document.querySelector('.proxy');
    (el as HTMLElement).innerHTML = proxyData.name;
};

function handleInputEvent(event: Event) {
    proxyData.name = (event.target as HTMLInputElement).value;
}

// function changeNumber() {
//     console.log('proxyData.index: ', Promise.resolve(proxyData.index));
// }
onMounted(() => effect(handleValue));

// effect(changeNumber, {
//     scheduler(fn) {
//         jobQueue.add(fn);
//         flushQueue();
//     },
// });
const sumVal = computed(() => proxyData.name + proxyData.index);

effect(() => {
    console.log(sumVal.value);
});

watch(
    () => proxyData.index,
    (newVal: any, oldVal: any) => {
        console.log('变化了', newVal, oldVal);
    },
    {
        immediate: true,
    }
);

proxyData.index++;
</script>

<style>
</style>
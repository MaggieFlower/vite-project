<template>
    <component :is="hash ? 'a' : 'span'" :href="path" @click.stop="handleClick">
        <slot></slot>
    </component>
</template>
<script setup lang="ts">
import { useRouter, createBindEvent } from './miniRouter.js';
import { defineProps, ref } from 'vue';
const props = defineProps({
    to: { type: String, required: true },
});
const routeHistory = useRouter().history;
const hash = routeHistory.type === 'hash';
const path = ref('');
if (hash) {
    path.value = `#${props.to}`;
}
// else {
//     // history.pushState('{}', '设置页', props.to);
// }

window.addEventListener('push', () => {
    window.dispatchEvent(routeHistory.popEvent);
});
function handleClick () {
    if (hash) {
        return;
    }
    window.history.pushState('{}', '设置页', props.to);
    window.dispatchEvent(routeHistory.pushEvent);
    // history.go();
}
</script>

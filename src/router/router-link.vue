<template>
    <component :is="hash ? 'a': 'span'" :href="path" @click.stop="handleClick">
        <slot></slot>
    </component>
</template>
<script setup lang="ts">
    import {useRouter, createBindEvent} from './miniRouter.js';
    import {ref} from 'vue';
    const props = defineProps({
        to: {type: String, required: true}
    });
    const routeHistory = useRouter().history;
    const hash = routeHistory.type === 'hash';
    const path = ref('')
    if (hash) {
        path.value = `#${props.to}`
    } else {
        // console.log('props.to; ', props.to)
        // history.pushState('{}', '设置页', props.to);
    }

    window.addEventListener('push', () => {
        console.log('11: 1',routeHistory.popEvent)
        window.dispatchEvent(routeHistory.popEvent)
    });
    function handleClick() {
        console.log('点击事件')
        if (hash) {
            return;
        }
        history.pushState('{}', '设置页', props.to);
        window.dispatchEvent(routeHistory.pushEvent)
        // history.go();
    }
</script>
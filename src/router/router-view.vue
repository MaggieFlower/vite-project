<template>
    <component :is="component"></component>
</template>
<script setup lang="ts">
    import {computed} from 'vue';
    import {useRouter} from './miniRouter.js';
    const {routes, current} = useRouter();
    const component = computed(() => {
        const r = routes.find(route => route.path === current.value)
        return r.component
    })
</script>
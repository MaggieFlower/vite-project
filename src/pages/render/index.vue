<template>
    <section id="render"></section>
</template>

<script setup lang="ts">
import { createRenderer } from './renderer.jss';
import { onMounted } from 'vue';
const renderer = createRenderer();

onMounted(() => {
    renderer.render(
        {
            type: 'div',
            children: 'show you name',
        },
        document.querySelector('#render')
    );
});
</script>
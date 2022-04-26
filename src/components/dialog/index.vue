<template>
    <section class="mg-dialog">
        <h5 class="mg-dialog--title">{{ props.title }}</h5>
        <div class="mg-dialog--content">{{ props.content }}</div>
    </section>
</template>
<script setup lang='ts'>
import { defineProps } from 'vue';

interface Props {
    title: string;
    content: string;
}

const props = withDefaults(defineProps<Props>(), {
    title: '弹窗',
    content: '这是一个弹窗',
});
</script>

<style lang="scss">
@import '@/styles/bem.scss';
@include b('dialog') {
    position: fixed;
    right: 0px;
    top: 0px;
    width: 300px;
    height: 150px;
    &--title {
        text-align: left;
    }
}
</style>
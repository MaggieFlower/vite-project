<template>
<section class="mg-form">
    <slot></slot>
</section>
</template>
<script setup lang='ts'>
import { PropType, provide, ref } from 'vue';
import { Rules } from 'async-validator';
import { FormItem, key } from './type';

</script>
<script lang='ts'>
export default {
    name: 'mgForm'
};
</script>
<style lang='scss'>
@import '@/styles/bem.scss';
@include b('form'){
}
</style>

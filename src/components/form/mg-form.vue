<template>
<section class="mg-form">
    <slot></slot>
</section>
</template>
<script setup lang='ts'>
import { PropType, provide, ref } from 'vue';
import { Rules } from 'async-validator';
import { FormItem, key } from './type';
import {emitter} from '@/utils/emitter';

// props注册
const props = defineProps({
    model: {type: Object, required: true},
    rules: {type: Object as PropType<Rules>}
})

// 全局注册key
provide(key, {
    model: props.model,
    rules: props.rules
})

const items = ref<FormItem[]>([])

emitter.on('addFormItem', (item:{validate: () => Promise<any>}) => {
    items.value.push(item);
})

function validate(cb: (isValid: boolean) => void) {
    const tasks = items.value.map(item => item.validate());
    Promise.all(tasks).then(() => {
        cb(true);
    }).catch(() => {
        cb(false);
    });
}

// 给组件直接调用refs.validate的时候使用
defineExpose({
    validate
})




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

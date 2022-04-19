<template>
<section class="mg-input">
    <input :value="modelValue" @input="onInput" class="mg-input--inner"/>
</section>
</template>
<script lang='ts'>
import { emitter } from '../../utils/emitter';
export default {
    name: 'mgInput'
};
</script>
<script setup lang='ts'>
type Props = {
    modelValue: string
}
const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'update:model-value', value: string): void
}>();

function onInput(e: Event) {
    const inputEl = e.target as HTMLElement;
    emit('update:model-value', inputEl.value);
    emitter.emit('validate');
}

</script>
<style lang='scss'>
@import '@/styles/bem.scss';
@include b('input'){
}
</style>

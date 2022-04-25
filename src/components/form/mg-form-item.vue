<template>
<section class="mg-form-item">
    <label v-if="label" class="mg-form-item--label">{{label}}</label>
    <slot/>
    <p :class="[error ? 'mg-form-item--error': 'mg-form-item--hide-error']">
        {{error}}
    </p>
</section>
</template>
<script setup lang='ts'>
import Schema from 'async-validator';
import { onMounted, ref, inject } from 'vue';
import { FormItem, key } from './type';
import { emitter } from '@/utils/emitter';

type Props = {
    label?: string,
    prop?: string
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    prop: ''
})

const error = ref("");
const formData = inject(key);

const o:FormItem = {
    validate
}

defineExpose(o);

onMounted(() => {
    if (props.prop) {
        emitter.on("validate", () => {
            validate();
        });
        emitter.emit('addFormItem', o);
    }
})

function validate() {
    if (formData?.rules === undefined) {
        return Promise.resolve({result: true})
    }
    // props.prop指定的key
    const rules = formData.rules[props.prop]

    // props.prop指定的value
    const value = formData.model[props.prop]
    const schema = new Schema({[props.prop]: rules});
    return schema.validate({[props.prop]: value}, { firstFields: true },(errors, fields) => {
        // console.log('fields: ', fields);
        // console.log('rules: ', rules);
        console.log('props.prop: ', props.prop);
        // console.log('errors: ', errors);
        error.value = errors ? (errors[0].message || "校验错误") : ''
    })
}



</script>

<script lang='ts'>
export default {
    name: 'mgFormItem'
};
</script>

<style lang='scss'>
@import '@/styles/bem.scss';
@import '@/styles/var.scss';
@include b('form-item'){
    &--label{
        padding-bottom: 8px;
        display: inline-block;
    }
    &--error{
        color: $errorColor;
        margin-bottom: 0px;
        opacity: 1;
        height: 22px;
    }
    &--hide-error{
        margin-bottom: 0px;
        opacity: 0;
        height: 22px;
    }
}
</style>

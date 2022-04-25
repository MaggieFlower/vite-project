<template>
  <mg-form :model="formData" :rules="rules" ref="formRef">
    <mg-form-item label="用户名" prop="username">
      <mg-input v-model="formData.username"></mg-input>
      <!-- <el-input :model-value="" @update:model-value=""></el-input> -->
    </mg-form-item>
    <mg-form-item label="密码" prop="passwd">
      <mg-input type="textarea" v-model="formData.passwd"></mg-input>
    </mg-form-item>
    <mg-form-item>
      <a-button type="primary" @click="submitForm()">登录</a-button>
    </mg-form-item>
  </mg-form>
</template>
<script lang="ts" setup>
import {Rules} from 'async-validator';
import {ref} from 'vue';
type Form = {
    username: string,
    passwd: string
}

const formData = ref<Form>({
    username: '',
    passwd: ''
})

const rules:Rules = {
    username: {
        type: 'string', required: true,message: '请填写用户名'
    },
    passwd: {
        type: 'string', required: true, message: '请输入密码'
    }
}

const formRef = ref(null);
function submitForm() {
    const el = formRef.value;
    console.log('ref: ', el);
    el.validate((isValid:boolean) => {
        console.log(isValid)
    })
}
</script>

<style lang="scss">
@import '@/styles/bem.scss';

</style>
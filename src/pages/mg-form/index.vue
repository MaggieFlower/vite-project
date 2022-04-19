<template>
  <mg-form :model="ruleForm" :rules="rules" ref="formRef">
    <mg-form-item label="用户名" prop="username">
      <mg-input v-model="ruleForm.username"></mg-input>
      <!-- <el-input :model-value="" @update:model-value=""></el-input> -->
    </mg-form-item>
    <mg-form-item label="密码" prop="passwd">
      <mg-input type="textarea" v-model="ruleForm.passwd"></mg-input>
    </mg-form-item>
    <mg-form-item>
      <el-button type="primary" @click="submitForm()">登录</el-button>
    </mg-form-item>
  </mg-form>
</template>
<script lang="ts" setup>
import {Rules} from 'async-validator';
import {ref} from 'vue';
type RuleForm = {
    username: string,
    passwd: string
}

const ruleForm:RuleForm = {
    username: '',
    passwd: ''
}

const rules:Rules = {
    username: [{
        type: 'string', required: true,message: '请填写用户名'
    }],
    passwd: [{
        type: 'string', required: true, message: '请输入密码'
    }]
}

const formRef = ref(null);
function submitForm() {
    const el = formRef.value;
    console.log(el)
}
</script>
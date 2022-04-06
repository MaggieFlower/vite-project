<template>
    <a-form
        :model="formState"
        name="login"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 24 }"
    >
        <a-form-item label="用户名" name="phone">
            <a-input v-model:value="formState.phone"></a-input>
        </a-form-item>
        <a-form-item label="密码" name="password">
            <a-input v-model:value="formState.password"></a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" @click="handleSubmit">确定</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {useStore} from 'vuex';
// TODO:Store里为什么无法使用useRouter
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

interface FormState{
    phone: string,
    password: string
}
const formState = ref<FormState>({
    phone: '',
    password: ''
});

const handleSubmit =  async () => {
    const res = await store.dispatch('user/login', formState.value);
    if (res) {
        router.push('/task')
    }
}

</script>
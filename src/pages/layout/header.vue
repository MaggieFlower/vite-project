<template>
    <article class="container-header">
        <div class="user-info-wrapper">
            <span class="login" @click="action">{{
                get(profile, 'nickname')
                    ? `${get(profile, 'nickname')} 登出`
                    : '登录/注册'
            }}</span>
            <img
                class="avator"
                v-if="get(profile, 'avatarUrl')"
                :src="get(profile, 'avatarUrl')"
                alt="avator"
            />
        </div>
    </article>
</template>
<script setup lang="ts">
import { login } from '@/services/api/user';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { get } from 'lodash';
// 每执行一次，getters也会执行
const store = useStore();
const router = useRouter();

const profile = computed(() => {
    return get(store.getters, 'user/userInfo');
});

async function action () {
    if (get(profile.value, 'nickname')) {
        const res = await store.dispatch('user/logout');
        return;
    }
    router.push('/login');
}
</script>
<style lang="less">
.container-header {
    height: 64px;
    padding: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: content-box;
    line-height: 1;
    background-color: rgba(0, 21, 41, 0.1);
    .user-info-wrapper {
        .login {
            margin-right: 8px;
            &:hover {
                cursor: pointer;
            }
        }
        .avator {
            width: 40px;
            height: 40px;
            border-radius: 20px;
        }
    }
}
</style>

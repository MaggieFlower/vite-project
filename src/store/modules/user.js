import {login, logout} from '@/services/api/user';
import {get, isEmpty} from 'lodash';
const state = () => ({
    profile: null,
    token: ''
});

const getters =  {
    token(state) {
        state.token = localStorage.getItem('Token');
        return state.token;
    },
    userInfo(state) {
        // 直接return localStorage的值不会被reactive
        state.profile = JSON.parse(localStorage.getItem('__info'));
        return  state.profile;
    }
}

const mutations = {
    setUserProfile(state, profile) {
        if (isEmpty(profile)) {
            throw new Error('用户账户信息为空，请检查参数');
        }
        state.profile = profile;
        localStorage.setItem('__info', JSON.stringify(profile));
    },
    clearProfile(state) {
        state.profile = null;
        localStorage.removeItem('__info');
    },
    setToken(state, token) {
        state.token = token;
        localStorage.setItem('Token', token);
    },
    clearToken(state){
        state.token = '';
        localStorage.removeItem('Token');
    },
    clear() {
        // 参数：state
        this.commit('user/clearToken');
        this.commit('user/clearProfile');
    }
}

const actions = {
    async login({commit, state}, formState) {
        const res = await login(formState);
        if(get(res, 'code') === 200) {
            commit('setToken', get(res, 'token') || '');
            commit('setUserProfile', get(res, 'profile') || {});
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    },
    async logout({commit, state}) {
        const res = await logout();
        if (get(res, 'code') === 200) {
            commit('clear');
            return Promise.resolve(true)
        }
        return Promise.resolve(false)
    }
}

export const user = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
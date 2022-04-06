import axios from 'axios';
import store from '../store/index';
import { message } from 'ant-design-vue';
message.config({
    maxCount: 1
});
const service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
    withCredentials: true
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data;
        console.log('res: ', res);
        if (res.code !== 200) {
            message.error(res.message || '请求报错啦！');
            return res.message || 'Error';
        }
        return res;
    },
    error => {
        console.log('接口信息报错error', error);
        return Promise.reject(error);
    }
);

export default service;

import Home from '../pages/home/index.vue';
import Marketing from '../pages/marketing/index.vue';
import Login from '../pages/login/index.vue';
import { RouteRecordRaw } from 'vue-router';

// interface  extends用于有确认类型
type RouteRecord = RouteRecordRaw & {
    hidden?: boolean;
};

export const routes: RouteRecord[] = [
    {
        path: '',
        name: 'root',
        redirect: '/marketing',
    },
    {
        path: '/task',
        name: 'task',
        component: Home,
        meta: { auth: true },
    },
    {
        path: '/marketing',
        name: 'marketing',
        component: Marketing,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        hidden: true,
    },
    {
        path: '/layout',
        name: 'mg-layout',
        component: () => import('@/pages/home/layout.vue'),
    },
    {
        path: '/transform',
        name: 'transform',
        component: () => import('@/pages/transform/layout.vue'),
    },
    {
        path: '/form',
        name: 'form',
        // 异步加载必须加.vue后缀
        component: () => import('@/pages/mg-form/index.vue'),
    },
    {
        path: '/tree',
        name: 'mgTree',
        component: () => import('@/pages/mg-tree/index.vue'),
    },
    {
        path: '/vscroll',
        name: 'virtual-scroll',
        component: () => import('@/pages/virtual-scroll/index.vue'),
    },
    {
        path: '/proxy',
        name: 'proxy',
        component: () => import('@/pages/proxy/index.vue'),
    },
    {
        path: '/render',
        name: 'render',
        component: () => import('@/pages/render/index.vue')
    }
];

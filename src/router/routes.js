import Home from '../pages/home/index.vue';
import Marketing from '../pages/marketing/index.vue';
import Login from '../pages/login/index.vue';

export const routes = [
    {
        path: '/',
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
];

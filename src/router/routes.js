import Home from '../pages/home/index.vue';
import Marketing from '../pages/marketing/index.vue';
import Login from '../pages/login/index.vue';

export const routes = [{
    path: '/task',
    name: 'task',
    component: Home,
    meta: { auth: true }
}, {
    path: '/marketing',
    name: 'marketing',
    component: Marketing
}, {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true
}];

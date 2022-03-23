import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import Home from '../pages/home/index.vue';
import Marketing from '../pages/marketing/index.vue'
const routes = [{
    path: '/',
    redirect: '/task'
},{
    path: '/task',
    name: 'task',
    component: Home,
}, {
    path: '/marketing',
    name: 'marketing',
    component: Marketing
}]

const router = new createRouter({
    history: createWebHistory(),
    routes
});
export default router;

import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes.js';
// import {useStore} from 'vuex';
import store from '@/store/index.js';
// const store = useStore();
console.log('store: ', store);

const router = new createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from) => {
    const token = store.getters['user/token'];
    if (to.meta.auth && !token && !to.path.includes('/login')) {
        return '/login';
    }
    return true;
});
export default router;

import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes.js';
// import {useStore} from 'vuex';
import store from '@/store/index.js';
// const store = useStore();

const router = new createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    const token = store.getters['user/token'];
    if (to.meta.auth && !token && !to.path.includes('/login')) {
        return '/login';
    }
    return true;
});
export default router;

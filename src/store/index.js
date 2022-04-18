import { createStore } from 'vuex';
import { user } from './modules/user.js';
import { other } from './modules/other.js';

const store = createStore({
    modules: {
        other,
        user,
    },
});
export default store;

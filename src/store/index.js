import {createStore} from 'vuex';
const store = createStore({
    state() {
        return {
            count: 1,
            name: 'timo'
        };
    },
    getters: {
        double(state) {
            return state.count * 2;
        }
    },
    mutations:  {
        add(state) {
            state.count ++;
        },
        getName(state) {
            state.name = 'benben';
        }
    },
    actions: {
        async changeName({commit, state}) {
            /**
             * commit: ƒ boundCommit(type, payload, options2)
                dispatch: ƒ boundDispatch(type, payload)
                getters: {}
                rootGetters: {}
                rootState: Proxy {count: 1, name: 'timo'}
                state: Proxy {count: 1, name: 'timo'}
             */
            // const name = await commit('getName');
            setTimeout(() => {
                commit('getName')
            }, 1000);
        }
    }
})
export default store;
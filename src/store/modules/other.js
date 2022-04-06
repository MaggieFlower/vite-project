export const other = {
    namespaced: true,
    state: () => ({count:1 }),
    mutations: { 
        add(state) {
            state.count ++;
        }
     },
    actions: {
        async changeName({commit, state}) {
            /**参数
             * commit: ƒ boundCommit(type, payload, options2)
                dispatch: ƒ boundDispatch(type, payload)
                getters: {}
                rootGetters: {}
                rootState: Proxy {count: 1, name: 'timo'}
                state: Proxy {count: 1, name: 'timo'}
            */
            setTimeout(() => {
                commit('add')
            }, 1000);
        } 
    },
    getters: {
        double(state) {
            return state.count * 2;
        }
    }
  }

import { ref, watchEffect } from 'vue';
interface Todo{
    value: string,
    label: string,
    done: boolean
}
export function getStorage (name: string, initValue: []) {
    const data = ref<Todo[]>(JSON.parse(localStorage.getItem(name) || JSON.stringify(initValue)));
    watchEffect(() => {
        localStorage.setItem(name, JSON.stringify(data.value));
    });
    return data;
}
export function getToken () {
    return localStorage.getItem('Token');
}

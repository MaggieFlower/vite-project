<template>
    <div>
        <span>{{double}}</span>
        <button @click="getName">click me</button>
        <div>{{name}}</div>
    </div>
</template>
<script setup lang="ts">
import {useStore} from 'vuex';
import {computed} from 'vue';
const store = useStore();
console.log('store111: ', store);
const double = computed(() => store.getters['other/double']);
const name = computed(() => store.state.other.name);
function add () {
    store.commit('other/add');
}
function getName() {
    store.dispatch('other/changeName');
}
</script>
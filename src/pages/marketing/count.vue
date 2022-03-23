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
const double = computed(() => store.getters.double);
const name = computed(() => store.state.name);
function add () {
    store.commit('add');
}
function getName() {
    store.dispatch('changeName');
}
</script>
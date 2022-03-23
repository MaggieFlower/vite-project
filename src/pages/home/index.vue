

<template>
  <div>
    <Header :level="1">这是首页</Header>
    <TodoList/>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch, onUnmounted, toRefs, toRef} from 'vue'
import TodoList from './todoList.vue';
import Header from '../../components/header-public.jsx'
</script>
<style scoped lang="less">

</style>

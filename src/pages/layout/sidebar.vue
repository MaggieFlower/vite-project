<template>
    <nav class="container-menu">
        <router-link
            v-for="route in allPath"
            :key="route.name"
            :to="route.path"
            >{{ route.name }}</router-link
        >
    </nav>
</template>
<script setup lang="ts">
import { routes } from '@/router/routes.ts';
import { RouteRecordRaw } from 'vue-router';

const allPath = routes.filter((route: RouteRecordRaw) => route.path);
</script>
<style lang="less">
.container-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 150px;
    min-width: 150px;
    height: 100%;
    background-color: #f0f2f5;
}
</style>

<template>
    <nav class="container-menu">
        <template v-for="route in allPath"  :key="route.name">
          <router-link  :to="route.path">{{route.name}}</router-link>
          <br />
        </template>
<!-- 
        <router-link to="/marketing">营销页面</router-link>
        <br/>
        <router-link to="/layout">mg布局</router-link>
         <br/>
        <router-link to="/transform">动画</router-link>
        <br/>
        <router-link to="/transform">表单</router-link> -->
    </nav>
</template>
<script setup lang="ts">
import {routes} from '@/src/router/routes.ts';
import { RouteRecordRaw } from 'vue-router';


const allPath = routes.filter((route:RouteRecordRaw) => route.path);
</script>
<style lang="less">
.container-menu{
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

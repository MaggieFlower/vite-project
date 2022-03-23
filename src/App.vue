<template>
  <section>
    <Header></Header>
    <section class="container-content-wrapper">
      <Sidebar></Sidebar>
      <Content></Content>
    </section>
  </section>
</template>
<script setup lang="ts">
  import Header from './pages/layout/header.vue';
  import Sidebar from './pages/layout/sidebar.vue';
  import Content from './pages/layout/content.vue';
</script>
<style>
.container-content-wrapper{
  display: flex;
  align-content: center;
  height: calc(100vh - 112px);
  width: 100%;
}
</style>

<template>
  <MgContainer>
        <MgHeader>
          <Header></Header>
        </MgHeader>
        <MgContainer>
            <MgSidebar>
              <Sidebar></Sidebar>
            </MgSidebar>
            <MgContent>
                <Content></Content>
            </MgContent>
        </MgContainer>
    </MgContainer>
</template>
<script setup lang="ts">
import Header from './pages/layout/header.vue';
import Sidebar from './pages/layout/sidebar.vue';
import Content from './pages/layout/content.vue';
</script>
<style lang="scss">
@import "@/styles/public.scss";
</style>

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
@import '@/styles/public.scss';
ul,
ol,
dl {
    padding: 0px;
    margin: 0px; // 被antdv的样式覆盖了,不想用important的方式加
    list-style: none;
}
p {
    margin: 0px;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    // background-color: #ccc;
}
/*滚动条的轨道*/
::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background-color: #bdbdbd;
    // border-radius: 10px;
}
/*滚动条的滑块按钮*/
::-webkit-scrollbar-thumb {
    border-radius: 10px;

    background-color: #9e9e9e;
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.25);
}
</style>

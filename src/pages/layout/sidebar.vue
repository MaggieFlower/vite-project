<template>
    <nav class="container-menu">
        <router-link to="/task">任务</router-link>
        <br/>
        <router-link to="/marketing">营销页面</router-link>
    </nav>
</template>
<style lang="less">
.container-menu{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 150px;
  min-width: 150px;
  background-color: #f0f2f5;
}
</style>
<template>
    <article class="container-content">
        <router-view v-slot="{Component,route}" >
            <transition name="fade"  mode="out-in">
                <!-- 需要给组件加上key，因为组件会有相同的标签 -->
                <component :is="Component" :key="route.path">
                </component>
            </transition>
        </router-view>
    </article>
</template>
<style lang="less">
.container-content{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}

.fade-enter-from{
  opacity: 0;
  transform: translateX(-100%);
}
.fade-leave-to{
  opacity: 0;
  transform: translateX(100%);
}
</style>
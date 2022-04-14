<template>
    <div class="mg-sidebar">
        <slot/>
    </div>
</template>
<script lang="ts">
export default {
    name: 'MgSidebar'
};
</script>
<script setup lang="ts"></script>
<style lang="scss">
@import '@/styles/bem.scss';

@include b(sidebar){
    min-width: 100px;
    height: 100%;
}
</style>

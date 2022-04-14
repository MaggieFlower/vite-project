<template>
    <div class="mg-content">
        <slot/>
    </div>
</template>
<script lang="ts">
export default {
    name: 'MgContent'
};
</script>
<script setup lang="ts"></script>
<style lang="scss">
@import '@/styles/bem.scss';

@include b(content){
    min-height: 300px;
    flex: 1
}
</style>

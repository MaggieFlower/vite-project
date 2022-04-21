<template>
    <div class="mg-header">
        <slot/>
    </div>
</template>
<script lang="ts">
export default {
    name: 'MgHeader'
};
</script>
<script setup lang="ts"></script>
<style lang="scss">
@import '@/styles/bem.scss';

@include b(header) {
}
</style>

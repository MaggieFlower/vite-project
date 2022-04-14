<template>
    <div class="mg-footer">
        <slot/>
    </div>
</template>
<script lang="ts">
export default {
    name: 'MgFooter'
};
</script>
<script setup lang="ts"></script>
<style lang="scss">
@import '@/styles/bem.scss';

@include b(footer){
    height: 100px;
}
</style>

<template>
  <div class="marketing-content">
    <h5 class="marketin-content-title">市场营销页面</h5>
    <button @click="handleClick">切换标题颜色</button>
    <Rate v-model="score">
      <template v-slot:title>
        <h5>请给我们的服务评分</h5>
      </template>
    </Rate>
    <br />
    <Count></Count>
    <MgDialog v-model="visible" title="标题" content="内容" position="top-left">
        <div>文章里链接</div>
        <div>文章里链接</div>
        <div>文章里链接</div>
        <div>文章里链接</div>
        <div>文章里链接</div>
        <div>文章里链接</div>
        <div>文章里链接</div>
        <div>文章里链接</div>
        <div>文章里链接</div>
        <div>文章里链接</div>
        <div>文章里链接</div>
    </MgDialog>
  </div>
</template>
<script lang="ts" setup>
import { getColor } from '@/utils/color';
import { defineComponent, ref, watch } from 'vue';
import Rate from './rate.vue';
import Count from './count.vue';
import MgDialog from '@/components/dialog/index.vue';

const titleColor = ref < string > ('');
const score = ref < number > (0);
const visible = ref < boolean > (false);
function handleClick () {
    visible.value = true;
    titleColor.value = getColor().color.value;
}
</script>
<style>
.marketin-content-title {
  font-size: 20px;
  color: v-bind(titleColor);
}
</style>

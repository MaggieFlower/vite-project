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
  </div>
</template>
<script lang="ts" setup>
import { getColor } from "../utils/color";
import { defineComponent, ref, watch } from "vue";
import Rate from "./rate.vue"
import Count from "./count.vue";
const titleColor = ref<string>("");
const score = ref<number>(0);
function handleClick() {
  titleColor.value = getColor().color.value;
}
</script>
<style>
.marketing-content {
}
.marketin-content-title {
  font-size: 20px;
  color: v-bind(titleColor);
}
</style>

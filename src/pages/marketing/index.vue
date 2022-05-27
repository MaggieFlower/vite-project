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
        <!-- <MgDialog
            v-model="visible"
            title="标题"
            content="内容"
            position="top-left"
            @close="handleClose"
        >
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
        </MgDialog> -->
        <button @click="showDialog">查看弹窗</button>
    </div>
</template>
<script lang="ts" setup>
import { getColor } from '@/utils/color';
import { defineComponent, reactive, ref, toRef, watch } from 'vue';
import Rate from './rate.vue';
import Count from './count.vue';
import { Dialog } from '@/components/dialog/dialog.ts';
import MgDialog from '@/components/dialog/index.vue';

const titleColor = ref<string>('');
const score = ref<number>(0);
const visible = ref<boolean>(false);
function handleClick() {
    visible.value = true;
    titleColor.value = getColor().color.value;
}

const handleClose = () => {
    console.log('手动关闭拉');
};

const showDialog = function () {
    Dialog({
        onClose() {
            console.log('关闭了');
        },
        onOpen() {
            console.log('dakaile ');
        },
        modelValue: true,
    });
};

const stat = reactive({
    count: 0,
});

let statAlias = {
    a: 100,
    b: 200,
};
const name = toRef(statAlias, 'a');
console.log('name1: ', name);
statAlias.a = 123123;
console.log('name2: ', name);

setTimeout(() => {
    stat.count++;
    console.log('超时');
}, 2000);
watch(stat, (newVal, oldVal) => {
    console.log('compare: ', newVal, oldVal, newVal === oldVal);
});
</script>
<style>
.marketin-content-title {
    font-size: 20px;
    color: v-bind(titleColor);
}
</style>

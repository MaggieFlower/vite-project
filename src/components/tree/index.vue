<template>
    <div class="mg-tree">
        <mg-tree-node
            v-for="item in _sourceData"
            :key="item.id"
            :node="item"
        ></mg-tree-node>
    </div>
</template>

<script setup lang="ts">
import { DataType, UnitType } from './data.ts';
import { computed, onMounted, ref } from 'vue';
import { RightOutlined } from '@ant-design/icons-vue';

type Props = {
    sourceData: DataType;
};

const props = defineProps<Props>();

const _sourceData = ref<DataType>(props.sourceData);
// modifyData(_sourceData.value);
</script>

<style lang="scss">
@import '@/styles/bem.scss';

@include b(tree) {
}
</style>
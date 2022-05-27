<template>
    <ul class="mg-tree-node">
        <li :class="['mg-tree-node--label']" @click="handleNodeClick(node)">
            <right-outlined v-if="hasChild" class="mg-tree-node--icon" />
            <span class="mg-tree-node--text">{{ node.label }}</span>
        </li>
        <mg-tree-node
            v-for="child in node.children"
            :key="child.id"
            :node="child"
            :class="[node.show ? 'mg-tree-node--show' : 'mg-tree-node--hide']"
        ></mg-tree-node>
    </ul>
</template>
<script setup lang="ts">
import { RightOutlined } from '@ant-design/icons-vue';
import { DataType, UnitType } from './data.ts';
import { toRef, computed, unref } from 'vue';

type Props = {
    node: UnitType;
};

type Emits = {
    (event: 'nodeClick', value: UnitType): void;
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const node = toRef(props, 'node');
const hasChild = computed(() => {
    return unref(node).children && unref(node).children.length;
});

function modifyData(data: UnitType) {
    if (hasChild) {
        data.show = true;
    }
    data.show = true;
}

modifyData(node.value);

const handleNodeClick = (node: UnitType) => {
    if (hasChild) {
        node.show = !node.show;
    }
};
</script>

<style lang="scss">
@import '@/styles/bem.scss';

@include b(tree-node) {
    &--label {
        list-style: none;
    }
    &--hide {
        display: none;
    }
    &--show {
        display: block;
    }
    &--icon {
        font-size: 12px;
        margin-right: 8px;
        vertical-align: middle;
    }
    &--text {
        vertical-align: middle;
    }
}
</style>
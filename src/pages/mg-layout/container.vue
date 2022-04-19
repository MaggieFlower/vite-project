<template>
    <div
        :class="['mg-container', { 'is-vertical': isVertical }]"
    >
        <slot/>
    </div>
</template>

<script setup lang="ts">
import { useSlots, computed, VNode, Component} from 'vue';
import { get} from 'lodash';


interface Props {
    direction?: string
}

const props = defineProps<Props>();

const slots = useSlots();

const isVertical = computed(() => {
    const defaultSlot = get(slots, 'default');
    if (defaultSlot) {
        return defaultSlot().some((vn: VNode) => {
            const tag = (vn.type as Component).name;
            return tag === 'MgHeader' || tag === 'MgFooter';
        });

    }
    return props.direction === 'vertical';
});
</script>
<script lang="ts">

export default {
    name: 'MgContainer'
};

</script>
<style lang="scss">
@import '@/styles/bem.scss';
@include b(container) {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    flex:1;
    height: 100%;
    @include when(vertical) {
        flex-direction: column;
    }
}
</style>

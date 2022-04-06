<template>
    <section class="user-satisfied">
        <slot name="title"></slot>

        <nav class="fontTheme">
            <span class="star" v-for="index in whiteStarCount" :key="index" @click="starClick(index)">&#9733;</span>
            <span class="star black-star" v-for="index in blackStarCount" :key="index" @click="starClick(index)">&#9734;</span>
        </nav>
    </section>
</template>
<script setup lang="ts">
    import { ref, Ref, watchEffect} from 'vue';
    import { generateArray } from '../utils/generate-array';
    const props = defineProps({
        modelValue: {
            type: Number,
            require: true,
            default: 0
        },
        theme: {
            type: String,
            default: "orange"
        }
    });
    const whiteStarCount:Ref<number[]> = ref([]), blackStarCount:Ref<number[]> = ref([]);
    watchEffect(() => {
        whiteStarCount.value = generateArray(0, props.modelValue);
        blackStarCount.value = generateArray(props.modelValue, 5);
    })
    const emits = defineEmits(['update:modelValue']);
    function starClick(index:number) {
        emits('update:modelValue', index + 1);
    }
</script>
<style lang="less">


.user-satisfied{

    .star{
        font-size: 30px
    }
    .fontTheme{
        color: v-bind(theme);
        cursor: pointer;
    }
}

</style>
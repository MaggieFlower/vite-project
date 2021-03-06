<template>
    <teleport to="body">
        <section class="mg-dialog" v-if="showDialog">
            <article class="mg-dialog-wrapper" :style="positionStyle">
                <div class="mg-dialog-title-wrapper">
                    <h5 class="mg-dialog--title">{{ props.title }}</h5>
                    <close-outlined
                        class="mg-dialog-icon"
                        @click="
                            () => {
                                showDialog = false;
                            }
                        "
                    />
                </div>
                <div class="mg-dialog--content">
                    <slot>{{ props.content }}</slot>
                </div>
                <nav class="mg-dialog-button">
                    <button
                        class="
                            mg-dialog-button--cancel mg-dialog-button--public
                        "
                        @click="handleClick('cancel')"
                    >
                        {{ cancelText }}
                    </button>
                    <button
                        class="
                            mg-dialog-button--confirm mg-dialog-button--public
                        "
                        @click="handleClick('confirm')"
                    >
                        {{ confirmText }}
                    </button>
                </nav>
            </article>
        </section>
    </teleport>
</template>
<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue';
import { computed, PropType, onMounted, ref, watch } from 'vue';
import { Positions } from './enum';

interface Props {
    title?: string;
    content?: string;
    modelValue: boolean;
    position?: Positions.TOP_RIGHT | Positions.TOP_LEFT | Positions.CENTER;
    cancelText?: string;
    confirmText?: string;
}

const props = withDefaults(defineProps<Props>(), {
    title: '弹窗',
    content: '这是弹窗的内容',
    modelValue: false,
    position: Positions.TOP_RIGHT,
    cancelText: '取消',
    confirmText: '确认',
});

const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void;
    (event: 'close', value: string): void;
    (event: 'open'): void;
}>();
const showDialog = ref();

watch(
    () => props.modelValue,
    (val) => {
        console.log('val: ', val);
        showDialog.value = val;
    },
    {
        immediate: true,
    }
);

const handleClick = function handleClick(type: string) {
    // console.log('props.modelValue: ', props.modelValue);
    showDialog.value = false;
    emits('close', type);
    emits('update:modelValue', false);
};

onMounted(() => {
    console.log('props: ', props);
    emits('open');
});

const styleMap = {
    [Positions.TOP_RIGHT]: {
        top: '0px',
        right: '0px',
    },
    [Positions.TOP_LEFT]: {
        top: '0px',
        left: '0px',
    },
    [Positions.CENTER]: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
};
const positionStyle = computed(() => {
    const suffix = getPositionSuffix(props.position);
    // ts严格检查undefined类型，可先做判断再调用suffix
    return suffix ? styleMap[suffix] : {};
});

function getPositionSuffix(position: string) {
    if (position.endsWith('right')) return Positions.TOP_RIGHT;
    if (position.endsWith('left')) return Positions.TOP_LEFT;
    if (position.endsWith('center')) return Positions.CENTER;
}
</script>
<style lang="scss">
@import '@/styles/bem.scss';

@include b('dialog') {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    &-wrapper {
        position: absolute;
        top: 0px;
        right: 0px;
        min-width: 300px;
        width: 300px;
        min-height: 150px;
        background: #fff;
        border-radius: 4px;
        padding: 10px;
    }
    &--content {
        text-align: center;
    }
    &-title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25px;
        line-height: 25px;
    }
    &-button {
        text-align: right;
        padding-top: 10px;
        &--cancel {
            margin-right: 10px;
        }
        &--public {
            border-style: none;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            padding: 8px 20px;
            line-height: 1;
            color: rgba(0, 0, 0, 1);
            background: #fff;
            &:hover {
                color: rgba(0, 0, 0, 0.7);
            }
        }
    }
}
</style>

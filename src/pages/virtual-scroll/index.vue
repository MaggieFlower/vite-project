<template>
    <ul
        class="mg-vscroll-container"
        ref="vscrollContainer"
        @scroll="handleScroll"
    >
        <!-- 滚动的盒子跟padding的盒子不能是同一个,因为当paddingTop超过height的高度时,不能再滚动了 -->
        <div :style="paddingStyle" class="mg-vscroll-wrapper">
            <li
                v-for="song in showSongList"
                :key="song.name"
                class="mg-vscroll-unit"
            >
                <div class="mg-vscroll-text">
                    <h5>{{ song.name }}</h5>
                    <p>{{ song.singerName }}</p>
                </div>
                <div class="mg-vscroll-img">
                    <img :src="song.picUrl" alt="歌手头像" />
                </div>
            </li>
            <a-spin
                tip="正在努力加载哦~"
                class="mg-vscroll-spin"
                v-if="isRequest"
            ></a-spin>
        </div>
    </ul>
</template>

<script setup lang="ts">
import { getSingerId, getAllSongs } from './getData.ts';
import { nextTick, onMounted, ref, unref, computed } from 'vue';
import type { ArtistInfo } from './getData.ts';

const songList = ref<ArtistInfo[]>([]);
const pageSize = ref<number>(1);

const contanerHeight = ref<number>(0);
const oneHeight = ref<number>(101);
const startIndex = ref<number>(0);

// 元素定义的地方要获取元素的外层
const vscrollContainer = ref(null);

onMounted(async () => {
    await getSingerId();
    await init();
    await getContainerHeight();
});

const endIndex = computed(() => {
    let endIndex =
        Math.floor(contanerHeight.value / oneHeight.value) +
        2 +
        startIndex.value;
    if (!songList.value[endIndex]) {
        endIndex = songList.value.length;
    }
    return endIndex;
});

const paddingTop = computed(() => {
    return startIndex.value * oneHeight.value;
});

const paddingBottom = computed(() => {
    return (songList.value.length - endIndex.value) * oneHeight.value;
});

const paddingStyle = computed(() => {
    return {
        paddingTop: `${paddingTop.value}px`, // 往下滚时,截取数据后空出来的位置需要填充,让数据展示符合直觉
        paddingBottom: paddingBottom.value + 'px', // 加上padding-bottom让滚动条的位置跟实际数据符合,不加也没啥问题
    };
});

const showSongList = computed<ArtistInfo[]>(() => {
    return songList.value.slice(startIndex.value, endIndex.value);
});

const isBottom = computed(() => {
    return endIndex.value === songList.value.length;
});

function getContainerHeight() {
    const el: HTMLElement | null = vscrollContainer.value;
    if (el) {
        contanerHeight.value = (el as HTMLElement).offsetHeight;
        // 向下取整的基础上 + 2,才是真正的item个数
    }
}

function handleScroll(event: Event) {
    const el: HTMLElement | null = vscrollContainer.value;
    // const beforeTop =  el ? (el as HTMLElement).scrollTop : 0;
    const scrollTop = event.target.scrollTop;
    const beforeIndex = Math.floor(scrollTop / oneHeight.value);
    if (beforeIndex === startIndex.value) return;

    startIndex.value = beforeIndex;
    if (unref(isBottom)) {
        pageSize.value++;
        init();
    }

    console.log('isBottom: ', isBottom);
}

const isRequest = ref<boolean>(false);
async function init() {
    isRequest.value = true;
    const song = await getAllSongs(unref(pageSize));
    isRequest.value = false;
    songList.value.push(...song);
}
</script>

<style lang="scss">
// TODO: 将css存放到一个style
@import '@/styles/bem.scss';

@include b(vscroll) {
    &-container {
        height: 500px;
        width: 350px;
        border: 1px solid #bdbdbd;
        margin: 0px;
        overflow: auto;
    }
    &-wrapper {
        // overflow: auto;
        height: 100%;
    }
    &-unit {
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid rgba(165, 162, 162, 0.1);

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &-img {
        width: 80px;
        height: 80px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &-text {
        flex: 1;
        h5 {
            font-size: 14px;
        }
        p {
            margin: 0px;
            margin-top: 10px;
            font-size: 12px;
        }
    }

    &-spin {
        width: 100%;
        margin-top: 10px;
    }
}
</style>
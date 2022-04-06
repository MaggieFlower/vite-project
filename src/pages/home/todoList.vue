

<template>
  <section class="hello-world-wrapper">
    <a-input
      @focus="showList = true"
      @pressEnter="handlePressEnter"
      placeholder="请输入你的选项"
      v-model:value="inputValue"
    ></a-input>
    <transition-group
      tag="ul"
      :class="['options-list', { 'show-list': showList }]"
      name="tag"
    >
      <li v-for="(item, index) in selectOptions" :key="item.value">
        <a-checkbox
          v-model:checked="item.done"
          @click="handleOptionClick(item.label)"
        >
          <span :class="{ done: item.done }">{{ item.label }}</span>
        </a-checkbox>
        <close-circle-outlined @click="handleRemoveOption(index)" />
      </li>
      <nav class="operate-nav" :key="1">
        <div>
          <a-checkbox v-model:checked="selectedAll">全选</a-checkbox>
          <span>{{ finishedCount }}/{{ selectOptions.length }}</span>
        </div>
        <a v-if="finishedCount !== 0" @click="handleClearSelect">清空</a>
      </nav>
    </transition-group>
    <Transition name="error">
      <p class="error-description" v-show="showError">选项不能为空哦～</p>
    </Transition>
  </section>
</template>
<script setup lang="ts">
import {
  ref,
  Ref,
  reactive,
  onMounted,
  computed,
  watch,
  onUnmounted,
  toRefs,
  toRef,
  defineComponent,
} from 'vue';
import { todoOperate } from './todo';
import { getStorage } from '../utils/useStorage';
import { CloseCircleOutlined } from '@ant-design/icons-vue';
// defineProps<{ msg: string }>();

const {
  count,
  showList,
  selectOptions,
  finishedCount,
  inputValue,
  selectedAll,
  handleKeydown,
  handleClearSelect,
  handleOptionClick,
  handleRemoveOption,
} = todoOperate();
const showError: Ref<boolean> = ref<boolean>(false);

const handlePressEnter = async (event: KeyboardEvent) => {
  const res = await handleKeydown(event);
  showError.value = !res;
  const id = setTimeout(() => {
    showError.value = false;
    clearTimeout(id);
  }, 1000);
};

onMounted(() => {
  const wrapper = document.querySelector('.hello-world-wrapper');
  document.documentElement.addEventListener('click', (event: MouseEvent) => {
    const res = event.path.find((el) => {
      return el.isEqualNode && el.isEqualNode(wrapper);
    });
    if (!res) showList.value = false;
  });
});
</script>
<style scoped lang="less">
.hello-world-wrapper {
  margin: auto;
  width: 200px;
  .options-list {
    list-style: none;
    border: 1px solid lightgrey;
    opacity: 0;
    padding: 0px;
    position: absolute;
    transition: opacity 0.3s;
    width: inherit;
    height: 210px;
    overflow: auto;
    li {
      border: 1px solid lightgrey;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .anticon-close {
        color: rgba(0, 0, 0, 0.7);
        &:hover {
          color: #000;
        }
      }
      &:hover {
        background-color: rgba(255, 204, 240, 0.1);
        cursor: pointer;
      }
      .done {
        color: grey;
        text-decoration: line-through;
      }
    }
  }
  .show-list {
    opacity: 1;
  }
  .operate-nav {
    display: flex;
    justify-content: space-between;
    padding: 12px;
  }
  .error-description {
    position: absolute;
    top: 0px;
    background-color: lightgreen;
    color: #fff;
    padding: 10px 20px;
  }

  .tag-leave-to {
    transform: translateX(60px);
    opacity: 0;
  }
  .tag-enter-from {
    transform: translateX(-60px);
    opacity: 0;
  }
  .tag-leave-active,
  .tag-enter-active {
    transition: all 0.5s;
  }
  .error-enter-from,
  .error-leave-to {
    transform: translateY(-100%);
  }
  .error-leave-active,
  .error-enter-active {
    transition: transform 0.5s ease;
  }
}
</style>

import { ref, reactive, onMounted, computed, watch, onUnmounted, toRefs, toRef} from 'vue'
import { getStorage } from '@/utils/useStorage';

export function todoOperate() {
    const count = ref(3);
    const showList = ref(false);
    const selectOptions = getStorage('task-list-v1', []);
    const handleKeydown = function (el:KeyboardEvent){
        if (el.key === 'Enter' && el.which === 13) {
            return new Promise((resolve, reject) => {
                if (!inputValue.value) {
                    resolve(false);
                    return;
                }
                inputValue.value = '';
                selectOptions.value.unshift({
                    value: String(++count.value),
                    label: el.target.value,
                    done: false
                });
                resolve(true);
            })
        }
    }

    const finishedCount = computed(() => selectOptions.value.filter(el => el.done).length);
    const selectedAll = computed({
        get() {
            return Number(finishedCount.value) === selectOptions.value.length;
        },
        set(val:unknown) {
            selectOptions.value.forEach(el => {el.done = val})
        }
    });
    const handleClearSelect = () => {
        selectOptions.value.forEach(el => el.done=false);
    }

    const inputValue = ref<string>('');
    const handleOptionClick=(label: string) => {
        inputValue.value = label;
    }
    const handleRemoveOption = (index:number) => {
        selectOptions.value.splice(index,1)
    }
    return {count,showList,inputValue,selectedAll,selectOptions,finishedCount,handleKeydown,handleClearSelect,handleOptionClick, handleRemoveOption}
}
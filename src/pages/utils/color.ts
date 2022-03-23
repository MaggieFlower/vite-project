import  {onMounted, onUnmounted, ref, Ref} from 'vue';
export function getColor():({color: Ref<string>}) {
    const color = ref<string>('');
    const r = Math.ceil(Math.random() * 255);
    const g = Math.ceil(Math.random() * 255);
    const b = Math.ceil(Math.random() * 255);
    color.value = `rgb(${r},${g},${b})`;
    return {color}
}
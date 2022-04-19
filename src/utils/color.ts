import { ref, Ref } from 'vue';
/* eslint-disabled */
interface returnValue {
  color: Ref<string>
}
export function getColor (): returnValue {
    const color = ref<string>('');
    const r = Math.ceil(Math.random() * 255);
    const g = Math.ceil(Math.random() * 255);
    const b = Math.ceil(Math.random() * 255);
    color.value = `rgb(${r},${g},${b})`;
    return { color };
}

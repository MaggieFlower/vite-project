import { ref, onUnmounted, onMounted, Ref } from 'vue';
export function getMousePos ():({x:Ref<number>, y:Ref<number>}) {
    const [x, y] = [ref<number>(0), ref<number>(0)];
    const update = (event:MouseEvent) => {
        x.value = event.pageX;
        y.value = event.pageY;
    };
    onMounted(() => {
        document.addEventListener('mousemove', update);
    });
    onUnmounted(() => {
        document.removeEventListener('mousemove', update);
    });
    return { x, y };
}

import { defineComponent } from "vue";
export default defineComponent({
    props: {
        level: {
            type: Number,
            default: 1
        }
    },
    setup(props, {slots}){
        const tag = 'h' + props.level;
        return () => (<tag>{slots.default()}</tag>)
    }
})
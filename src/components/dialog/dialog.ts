import DialogComponent from './index.vue';
import { createComponent } from '../../composables/component.js';
import { isVNode } from 'vue';
import { defaultConfigProvider } from 'ant-design-vue/lib/config-provider';

export function Dialog(options: object) {
    return createDialog(mergeProps(options));
}

function createDialog(options: object) {
    const instance = createDialogOpts(options);
    console.log('instance: ', instance);
    addToBody(instance);
    return instance.proxy;
}

function addToBody(instance) {
    document.body.append(instance.vnode.el);
}
function createDialogOpts(options: object) {
    if (isVNode(options.message)) {
        return createComponent(DialogComponent, options, () => options.message);
    }
    return createComponent(DialogComponent, options);
}

function mergeProps(options) {
    const userOnClose = options.onClose;
    const userOnOpen = options.onOpen;
    delete options.onClose;
    delete options.onOpen;

    const defatultOptions = {
        onClose: () => {
            userOnClose && userOnClose();
        },
        onOpen: () => {
            userOnOpen && userOnOpen();
        },
    };
    return Object.assign({}, defatultOptions, options);
}

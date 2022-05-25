import { h, render } from 'vue';

export function createComponent(Component, options, children) {
    const vnode = h(Component, options, children);
    const container = document.createElement('div');
    render(vnode, container);
    return vnode.component;
}

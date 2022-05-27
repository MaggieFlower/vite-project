import MgTree from './index.vue';
import MgTreeNode from './tree-node.vue';
export default {
    install(app) {
        app.component('MgTree', MgTree);
        app.component('MgTreeNode', MgTreeNode);
    },
};

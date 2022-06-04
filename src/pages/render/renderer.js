
const Text = Symbol();
const Comment = Symbol();
const Fragment = Symbol();

function createRenderer (options = {}) {

    const {
        createElement,
        setElementText,
        insert,
        patchProps,
        createText,
        setText
    } = options;

    // 渲染、挂载子节点、更新
    function patch (n1, n2, container) {
        // n1 存在， 判断 n1 、 n2 是否是同一个类型的 vnode 类型
        if(n1 && n1.type !== n2.type) {
            // 不是同一个类型， 需要卸载 n1 ， 重新挂载 n2
            unmount(n1);
            n1 = null;
        }

        const elementType = typeof n2.type ;

        if (elementType === 'string') {
            if(!n1) {
                mountElement(n2, container);
            } else {
                // 更新操作
                patchElement(n1, n2, container);
            }
        } else if (elementType === 'object') {
            // 组件挂载
        } else if (n2.type === Text) {
            // 其他类型的挂载
            const el = n2.el = createText(n2.children);
            if (!n1) {
                insert(container, el);
            } else {
                const el = n2.el;
                if (n2.children !== n1.children) {
                    setText(el, n2.children);
                }
            }
        }  else if (n2.type === Fragment) {
            if (!n1) {
                n2.children.forEach(child => patch(null, child, container));
            } else {
                patchChildren(n1, n2, container);
            }
        }
    }
    function mountElement (n2, container) {
        const el = n2.el = createElement(n2.type);
        if (typeof n2.children === 'string') {
            setElementText(el, n2.children);
        } else if (Array.isArray(n2.children)) {
            n2.children.forEach(element => {
                patch(null, element, el);
            });
        }

        if (n2.props) {
            for (let key in n2.props) {
                patchProps(el, key, null, n2.props[key]);
            }
        }

        insert(container, el);
    }
    function patchElement (n1, n2, container) {
        // 更新props
        const newProps = n2.props;
        const oldProps = n1.props;
        const el = n2.el = n1.el;

        // 新旧属性中都在的 props ， 更新
        for (const key in newProps) {
            if (newProps[key] !== oldProps[key]) {
                patchProps(el, key, oldProps[key], newProps[key]);
            }
        }

        // 属性在旧 props 中存在， 在新 props 中不存在，则删除
        for (const key in oldProps) {
            if (!(key in newProps)) {
                patchProps(el, key, oldProps[key], null);
            }
        }
        // 把更新节点的单独提取出来，在节点类型是 fragment 的时候可以复用
        patchChildren(n1, n2, el);
    }
    function patchChildren (n1, n2, container) {
        // 新节点是 string 类型
        if(typeof n2.children === 'string') {
            // 旧节点是数组
            if (Array.isArray(n1.children)) {
                n1.children.forEach(el => unmount(el));
            }
            setElementText(container, n2.children);
        } else if (Array.isArray(n2.children)) {
            // 新节点是 array 类型
            if (Array.isArray(n1.children)) {
                // diff 算法更新
            } else if (typeof n1.children === 'string') {
                setElementText(container, '');
                n2.children.forEach(child => patch(null, child, container));
            }
        } else {
            // 新节点为空
            if (Array.isArray(n1.children)) {
                n1.children.forEach(el => unmount(el));
            } else if (typeof n1.children === 'string') {
                setElementText(container, '');
            }
        }
    }
    function unmount (vnode) {
        const el = vnode.el;
        // parentElement 与 parentNode 的关系
        // parentElement 只会返回父元素是 element 类型的， 没有就返回null
        // 例如 svg 这种。
        const parent = el.parentNode;
        if (parent) {
            parent.removeChild(el);
        }
    }
    function render (vnode, container) {
        if (vnode) {
            patch(container._vnode, vnode, container);
        } else {
            if (container._vnode) {      
                unmount(container._vnode);
            }
        }
        container._vnode = vnode;
    }
    return {
        render
    };
}
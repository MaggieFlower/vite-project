
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
    function patch (n1, n2, container, anchor) {
        // n1 存在， 判断 n1 、 n2 是否是同一个类型的 vnode 类型
        if(n1 && n1.type !== n2.type) {
            // 不是同一个类型， 需要卸载 n1 ， 重新挂载 n2
            unmount(n1);
            n1 = null;
        }

        const elementType = typeof n2.type ;

        if (elementType === 'string') {
            if(!n1) {
                mountElement(n2, container, anchor);
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
    function mountElement (n2, container, anchor) {
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

        insert(container, el, anchor);
    }
    function patchElement (n1, n2, container) {
        // 更新props
        const newProps = n2.props;
        const oldProps = n1.props;

        // DOM 的复用，新旧节点同一个 el
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
        if(typeof n2.children === 'string') {// 旧节点是数组
            if (Array.isArray(n1.children)) {
                n1.children.forEach(el => unmount(el));
            }
            setElementText(container, n2.children);
        
        } else if (Array.isArray(n2.children)) {// 新节点是 array 类型
            if (Array.isArray(n1.children)) {
                /**方案1 */
                // normalDiff(n1, n2, container);
                /**方案1 结束 */

                /** 方案2 
                 * 复用元素，减少删除、新增 DOM 的开销
                 * DOM 中已有的元素，更新其内容就好
                 * 不存在的则重新挂载
                */
                // simpleDiff(n1, n2, container);
                /**方案2 结束 */

                // 双端diff
                // bothSidesDiff(n1, n2, container);

                // 快速 diff
                fastDiff(n1, n2, container);
            } else if (typeof n1.children === 'string') {
                setElementText(container, '');
                n2.children.forEach(child => patch(null, child, container));
            }
        } else { // 新节点为空
            if (Array.isArray(n1.children)) {
                n1.children.forEach(el => unmount(el));
            } else if (typeof n1.children === 'string') {
                setElementText(container, '');
            }
        }
    }

    function normalDiff (n1, n2, container) {
        // 最简单的 diff 算法存在的问题是：新数组的节点相比旧数组只是换了元素的顺序
        // patch 的时候，判断不是同一类型的元素，会先卸载之前的元素，再挂载，增加的dom的开销
        const oldChildren = n1.children;
        const newChildren = n2.children;
        const oldChildrenLen = oldChildren.length;
        const newchildrenLen = newChildren.length;
    
        const commonLen = Math.min(oldChildrenLen, newchildrenLen);
    
    
                    
        // 遍历新旧节点中，长度最短的，也就是公共的部分
        for (let index = 0; index < commonLen; index++) {
            patch(oldChildren[index], newChildren[index],container);
        }
        // 如果旧子节点数组长度大于新的，说明有节点需要删除，从公共的索引开始遍历，找到需要删除的
        if (oldChildrenLen > newchildrenLen) {
            for (let index = commonLen; index < oldChildrenLen; index++) {
                unmount(oldChildren[index]);
            }
            // 反之，将新节点插入 container 中
        } else if (oldChildrenLen < newchildrenLen) {
            for (let index = commonLen; index <= newchildrenLen; index++) {
                patch(null, newChildren[index], container);
            }
        }
    }
    
    function simpleDiff (n1, n2, container) {
        /** 方案2 
         * 复用元素，减少删除、新增 DOM 的开销
         * DOM 中已有的元素，更新其内容就好
         * 不存在的则重新挂载
         * 当前算法存在的问题：3、2、1 -> 2、1、3 需要移动2次，实际只需要移动一次就好
        */
        const oldChildren = n1.children;
        const newChildren = n2.children;
        const oldChildrenLen = oldChildren.length;
        const newchildrenLen = newChildren.length;
        let lastIndex = 0 ;
    
        for (let i = 0; i < newchildrenLen; i++) {
            const newChild = newChildren[i];
            let find = false;
            for (let j = 0; j < oldChildrenLen; j++) {
                const oldChild = oldChildren[j];
                if (newChild.key === oldChild.key) {
                    patch(oldChild, newChild, container);
                    find = true;
                    // 出现逆序情况，说明有节点需要移动位置
                    if (j < lastIndex) {
    
                        // 查找到复用元素的前一个虚拟 DOM 节点，将这个新节点插入到这个
                        // 虚拟 DOM 对应的真实 DOM 前面
                        // 这里的新节点的前一个元素，一定有 el 的，
                        // 因为我们的循环从新数组开始，并且只要有复用的，就可以复用旧节点的 el
                        const prevVNode = newChildren[i - 1];
                        if (prevVNode) {
    
                            // 找到原来这个真实 DOM 的兄弟节点，把这个新元素插入到这个兄弟的前面，
                            const sibling = prevVNode.el.nextElementSibling;
                            insert( container,newChild.el, sibling);
                        }
                    } else {
                        lastIndex = j;
                    }
                    // 找到了就不要再继续循环 oldChildren 了
                    break;
                }
            }
    
            if (!find) {
                let prevEl = newChildren[i-1]?.el;
                let nextEl;
                // 没有前一个元素，说明是第一个元素
                if (!prevEl) {
                    // 第一个元素应该存放在现有的第一个元素前面
                    nextEl = container.firstChild;
                } else {
    
                    // 否则应该查看前一个 DOM 的后一个兄弟元素
                    nextEl = prevEl.nextElementSibling;
                }
                patch(null, newChild, container, nextEl);
            }
             
        }
        // 删除元素
        for (let index = 0; index < oldChildrenLen; index++) {
            const oldVNode = oldChildren[index];
            const has = newChildren.find(vnode => vnode.key === oldVNode.key);
            if (!has) {
                unmount(oldVNode);
            }
        }
    }

    function bothSidesDiff (n1, n2, container) {
        const oldChildren = n1.children;
        const newChildren = n2.children;
        let oldStartChildIndex = 0;
        let oldEndChildIndex = oldChildren.length - 1;
        let newStartChildIndex = 0;
        let newEndChildIndex = newChildren.length -1;

        while(oldStartChildIndex <= oldEndChildIndex && newStartChildIndex <= newEndChildIndex) {
            const oldStartChild = oldChildren[oldStartChildIndex];
            const newStartChild = newChildren[newStartChildIndex];
            const oldEndChild = oldChildren[oldEndChildIndex];
            const newEndChild = newChildren[newEndChildIndex];

            if (!oldStartChild) {
                oldStartChildIndex++;
            } else if (!oldEndChild) {
                oldEndChildIndex--;
            }else  if(oldStartChild.key === newStartChild.key) {
                patch(oldStartChild, newStartChild, container);
                oldStartChildIndex ++;
                newStartChildIndex ++;
            } else if (oldEndChild.key === newEndChild.key) {
                patch(oldEndChild, newEndChild, container);
                oldEndChildIndex --;
                newEndChildIndex --;
            }else if (oldStartChild.key === newEndChild.key) {
                patch(oldStartChild, newEndChild, container);
                insert(container, newEndChild.el, oldEndChild.el.nextElementSibling);
                oldStartChildIndex ++;
                newEndChildIndex --;
            } else if (oldEndChild.key === newStartChild.key) {
                patch(oldEndChild, newStartChild, container);
                insert(container, newStartChild.el, oldStartChild.el);
                oldEndChildIndex --;
                newStartChildIndex ++;
            } else {
                // 上述没有满足的 vnode，那么直接遍历旧的数组，找到跟新 vnode 数组的起始元素相等的 index
                const publicIndex = oldChildren.find(vnode => vnode.key === newStartChild.key);

                if (publicIndex > -1) {
                    // 更新
                    patch(oldChildren[publicIndex],newStartChild, container );
                    insert(container, newStartChild, oldStartChild.el);

                    // 将这个已经处理过的索引设置为 undefined，下次遍历到的时候， 不处理这个元素
                    oldChildren[publicIndex] = undefined;
                } else {
                    // 如果新数组中第一个元素不匹配旧数组中的任一元素，说明是新增的节点，新增的位置在现在的第一个 DOM 元素的前面
                    patch(null, newStartChild, container, oldStartChild.el);
                }
                newStartChildIndex++;
            }
        }

        // 新增的元素索引从 newStartChildIndex 开始，因此锚点是对应的 oldStartChildIndex
        // 新增元素，在循环的时候会被忽略，需要在这里处理、
        if (oldEndChildIndex < oldStartChildIndex && newStartChildIndex<=newEndChildIndex) {
            for (let index = newStartChildIndex; index <= newEndChildIndex; index++) {
                patch(null, newChildren[index], container, oldChildren[oldStartChildIndex]?.el);
            }
        }

        // 删除元素
        if (oldEndChildIndex >= oldStartChildIndex && newStartChildIndex>newEndChildIndex) {
            for (let index = oldStartChildIndex; index <= oldEndChildIndex; index++) {
                unmount(oldChildren[index]);
            }
        }
    }

    function fastDiff (n1, n2, container) {
        // 快速 diff 算法会有预处理的过程：即先把首位相同的元素处理了，再处理不相同的元素
        let j = 0;
        const oldChildren = n1.children;
        const newChildren = n2.children;
        let oldVNode = oldChildren[j];
        let newVNode = newChildren[j];
        // 处理头部相同节点
        while( oldVNode &&newVNode &&oldVNode.key === newVNode.key) {
            patch(oldVNode, newVNode, container);
            j ++;
            oldVNode = oldChildren[j];
            newVNode = newChildren[j];
        }
        // 处理头部相同节点结束

        // 处理尾部节点
        let oldEnd = oldChildren.length - 1;
        let newEnd = newChildren.length - 1;
        if (oldEnd !== 0 &&  newEnd !== 0) {

            oldVNode = oldChildren[oldEnd];
            newVNode = newChildren[newEnd];
            while( oldVNode &&newVNode && oldVNode.key === newVNode.key) {
                patch(oldVNode, newVNode, container);
                oldEnd --;
                newEnd --;
                oldVNode = oldChildren[oldEnd];
                newVNode = newChildren[newEnd];
            }
        }

        // 处理尾部节点结束

        // 旧节点遍历完成，新节点还有剩余，说明有新增的节点
        if(j > oldEnd && j <= newEnd) {
            // 因为到这一步的时候，新的节点已经全部更新到 dom 了，
            // 所以可以用新 vnode 的顺序来决定新节点插入的顺序
            const prevIndex = newEnd + 1;
            const anchor = newChildren[prevIndex] ? newChildren[prevIndex].el : null;

            // for 循环使用大师 😠
            // for(let i=j; i<= newEnd; i++) {
            //     patch(null, newChildren[i], container, anchor);
            // }

            // 书上的写法, 相比上一个for循环的写法，节省了一个变量的定义👍
            while(j <= newEnd) {
                patch(null, newChildren[j++], container, anchor);
            }
            // 新的数组遍历完了，旧数组还有没遍历的，需要删除
        } else if (j > newEnd && j <= oldEnd) {
            while (j <= oldEnd) {
                unmount(oldChildren[j++]);
            }
        } else{
            // 不满足预处理条件
            // 创建 source 存储新节点在旧节点中的索引, 长度就是未遍历完的元素的长度
            const length = newEnd - j +1;
            const source = new Array(length);
            source.fill(-1);

            // 查找未遍历的新节点在旧数组中的位置
            // for(let i=j;i<=oldEnd;i++) {
            //     for(let k=j; k<=newEnd;k++) {
            //         if (newChildren[k].key === oldChildren[i].key) {
            //             source[k - j] = i;
                        
            //         }
            //     }
            // }
            let toMove = false;
            let pos = 0;
            const keyMap = {};
            let newStart = j;
            let oldStart = j;

            // 避免嵌套循环，先把新数组中的 key 和 index 存起来
            for (let i=newStart;i<=newEnd;i++) {
                keyMap[newChildren[i].key] = i;
            }

            let patched = 0; // 已经更新过的数量
            for (let k = oldStart; k<= oldEnd; k++) {
                const oldVNode = oldChildren[k];
                
                // 更新的节点数小于等于总更新长度
                if(patched <= length) {
                    const index = keyMap[oldVNode.key];
                    if (typeof index !== 'undefined') {
                        patch(oldVNode, newChildren[index], container);
                        patched ++;
                        // 索引应该是 从 0 开始，因此需要减去起始值 j
                        source[index - newStart] = k;

                        // 旧节点在新的数组中呈逆序，则需要移动旧节点的位置来达到新节点在数组中的位置
                        if (index < pos)  {
                            toMove = true;
                        } else {
                            pos = index;
                        }
                    } else {
                        unmount(oldVNode);
                    }
                } else {
                    // 旧数组中，超过更新长度的节点，都需要被删除
                    unmount(oldVNode);
                }

            }

            if (toMove) {
                const lisArr = lis(source);
                let i =0; s = lisArr.length - 1;
                // 逆序循环， 把新节点先插入
                for (i = source.length - 1; i >= 0; i--) {
                    if (source[i] === -1) {
                        const index =  i + j;
                        const anchor = newChildren[index + 1] ? newChildren[index + 1].el : null;
                        patch(null, newChildren[index], container,anchor);
                    } else if (i !== lisArr[s]) {
                        const index =  i + j;
                        const anchor = newChildren[index + 1] ? newChildren[index + 1].el : null;
                        insert(container, newChildren[index].el, anchor);
                    }else {
                        s--; 
                    }
                }
            }
        }
        

    }
    function lis (arr) {
        const p = arr.slice();
        const result = [0];
        let i, j, u, v, c;
        const len = arr.length;

        for (i = 0; i<len; i++) {
            const arrI = arr[i];
            if (arrI !== 0) {
                j = result[result.length - 1];
                if (arr[j] < arrI) {
                    p[i] = j;
                    result.push(i);
                    continue;
                }
                u =0;
                v = result.length;
                while(u < v) {
                    c = ((u + v) / 2) | 0;
                    if (arr[result[c]] < arrI) {
                        u = c+ 1;

                    } else {
                        v =c;
                    }
                }
                if (arrI < arr[result[u]]) {
                    if (u > 0) {
                        p[i] = result[u - i];

                    }
                    result[u] = i;
                }
            }
            u = result.length;
            v = result[u - 1];
            while (u -- > 0) {
                result[u] = v;
                v = p[v];
            }
        }
        return result;
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



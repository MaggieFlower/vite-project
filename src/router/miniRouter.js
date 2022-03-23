import {inject, ref} from 'vue';
import RouterView from './router-view.vue';
import RouterLink from './router-link.vue';
const __ROUTER_KEY__ = 'router_key';
function createBindEvent(type) {
    const e = new Event(type);
    return e;
}
function createRouter(options) {
    return new Router(options);
}

function useRouter(app) {
    return inject(__ROUTER_KEY__);
}

function createWebHashHistory() {
    function bindEvent(fn) {
        window.addEventListener('hashchange', fn)
    }
    return {
        bindEvent,
        url: window.location.hash.slice('1') || '/',
        type: 'hash'
    }
}

function createWebHistory() {
    let popEvent = createBindEvent('pop');
    const pushEvent = createBindEvent('push');
    function bindEvent(fn) {
        window.addEventListener('pop', fn);
    }
    return {
        bindEvent,
        url: window.location.pathname,
        type: 'history',
        popEvent,
        pushEvent
    }
}

class Router{
    constructor(options) {
        this.history = options.history;
        this.routes = options.routes;
        this.current = ref(this.history.url);
        this.history.bindEvent(() => {
            const path = this.history.type === 'hash' ? window.location.hash.slice(1) : window.location.pathname;
            console.log('window.location.hash: , ', path)
            this.current.value = path;
        });
    }
    install(app) {
        app.provide(__ROUTER_KEY__, this);
        app.component('router-view',RouterView);
        app.component('router-link', RouterLink);
    }
}

export {createRouter, createWebHashHistory, useRouter, createWebHistory, createBindEvent}
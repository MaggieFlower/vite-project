import type { EffectFn } from './reactive.ts';

export let jobQueue = new Set();
let microTask = Promise.resolve();
let isRefreshing: boolean;

export function flushQueue() {
    if (isRefreshing) return;
    isRefreshing = true;
    microTask
        .then(() => {
            // 微任务,等同步任务执行完了才会执行微任务
            console.log('jobQueue任务开始执行');
            jobQueue.forEach((job: EffectFn) => job());
            console.log('jobQueue任务结束');
        })
        .finally(() => {
            isRefreshing = false;
            jobQueue.clear();
        });
}

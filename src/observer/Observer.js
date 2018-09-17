'use strict'

let PENDING = {

}
const WATCHERS = [];

let NEED_DISPATCH = false;
function Watcher(callback) {
    var watcher = {
        callback: callback,
        dispatchTime: 0
    }
    return watcher;
}

function unwatch(callback) {
    let all = WATCHERS;
    /**
     * @todos
     * 目前只删除第一个，后期可能会优化
     */
    for (let i = 0, l = all.length; i < l; i++) {
        if (all[i].callback === callback) {
            all.splice(i, 1);
            return;
        };
    }
}

function dispatchWatcher(watcher, data, timestamp) {
    watcher.dispatchTime = timestamp;
    watcher.callback.call(null, data);
}
/**
* 不再区分具体是哪个provider的change
*/
function watch(callback) {
    let watcher = Watcher(callback);
    WATCHERS.push(watcher);
}

function doWatch() {
    if (!NEED_DISPATCH) {
        return;
    }
    let timestamp = Date.now();
    let changed = PENDING;
    NEED_DISPATCH = false;
    WATCHERS.forEach(function (watcher) {
        dispatchWatcher(watcher, changed, timestamp);
    });
    PENDING = {};
}
function pendingWatch(changed) {
    PENDING[changed] = true;
    NEED_DISPATCH = true;

}
export { watch, doWatch, pendingWatch, unwatch };
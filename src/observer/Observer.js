'use strict'

const observers = [];

const PENDING = {

}
let NEED_DISPATCH = false;
function Watcher(callback) {
    var watcher = {
        callback: callback,
        dispatchTime: 0
    }
    return watcher;
}

function removeWatcher(observer, callback) {
    let all = observer._watchers;
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
    //确保在一次change中只被dispatch一次；
    // if (watcher.dispatchTime >= timestamp) {
    //     return;
    // } else {
    //     watcher.dispatchTime = timestamp;
    //     watcher.callback.call(null, data);
    // }
    watcher.dispatchTime = timestamp;
    watcher.callback.call(null, data);
}
/**
* 不再区分具体是哪个provider的change
*/
function watch(observer, callback) {
    var watcher = Watcher(callback);
    observer._watchers.push(watcher);
}

function doWatch() {
    if (! NEED_DISPATCH ) {
        return;
    }
    let timestamp = Date.now();
    let changed = PENDING;
    NEED_DISPATCH = false;
    PENDING = {};
    observers.forEach(function (observer) {
        observer._watchers.forEach(function (watcher) {
            dispatchWatcher(watcher, changed, timestamp);
        });
    });
}
function pendingWatch(changed) {
    PENDING[changed] = true;
    NEED_DISPATCH =true;
}
class Observer {
    constructor() {
        this._watchers = [];
        observers.push(this);
    }
    watch(callback) {
        watch(this, callback);
    }
    removeWatcher(callback) {
        removeWatcher(this, callback);
    }
    release() {
        this._watchers = null;
        observers.splice(observers.indexOf(this), 1);
    }
}
export { Observer, doWatch, pendingWatch };
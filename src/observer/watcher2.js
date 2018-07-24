'use strict'


var watchers = {
    '__all__': []
}
function setWatcher(watcher) {
    watchers['__all__'].push(watcher);
}
function removeWatcher(callback) {
    let all = watchers['__all__'];
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
function Watcher(callback) {
    var watcher = {
        callback: callback,
        dispatchTime: 0
    }
    return watcher;
}
function dispatchWatcher(watcher, data, timestamp) {
    //确保在一次change中只被dispatch一次；
    if (watcher.dispatchTime >= timestamp) {
        return;
    } else {
        watcher.dispatchTime = timestamp;
        watcher.callback.call(null, data);
    }
}
/**
* 不再区分具体是哪个provider的change
*/
function watch(callback) {
    var watcher = Watcher(callback);

    setWatcher(watcher);
}

function doWatch(changed) {
    let timestamp = Date.now();
    let all = watchers['__all__'];
    all.forEach(function (watcher) {
        dispatchWatcher(watcher, changed, timestamp);
    });
}

export {
    watch,
    doWatch,
    removeWatcher
}
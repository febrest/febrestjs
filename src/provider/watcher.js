'use strict'


var watchers = {

}
function setWatcher(providers, watcher) {
    providers.forEach(function (provide) {
        if (!watchers[provide]) {
            watchers[provide] = [];
        }
        watchers[provide].push(watcher);
    })
}
function removeWatcher(providers, callback) {
    providers.forEach(function (provide) {
        if (watchers[provide]) {
            let providerWatchers = watchers[provide];
            /**
             * @todo
             * 目前只删除第一个，后期可能会优化
             */
            for (let i = 0, l = watcher.length; i < l; i++) {
                if (providerWatchers[i].callback === callback) {
                    providerWatchers.splice(i, 1);
                    return;
                };

            }
        }
    })
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
    if(watcher.dispatchTime>=timestamp){
        return;
    }else{
        watcher.dispatchTime=timestamp;
        watcher.callback.call(null,data);
    }
}

function watch(providers, callback) {
    var watcher = Watcher(callback);
    if (typeof providers === 'string') {
        providers = [providers];
    }
    setWatcher(providers, watcher);
}

function doWatch(changed) {
    var timestamp = Date.now();
    for (var p in changed) {
        let providerWatcher = watchers[p];
        if (providerWatcher) {
            providerWatcher.forEach(function (watcher) {
                dispatchWatcher(watcher, changed, timestamp);
            })
        }
    }
}

export default {
    watch,
    doWatch,
    removeWatcher
}
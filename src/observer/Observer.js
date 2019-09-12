"use strict";

let PENDING = {};
const WATCHERS = [];

let NEED_DISPATCH = false;

function dispatchWatcher(watcher, changed, timestamp) {
  if (!watcher.namespace || changed[watcher.namespace]) {
    watcher.dispatchTime = timestamp;
    watcher.callback.call(null, changed);
  }
}

function doWatch() { }
function pendingWatch(changed) {
  PENDING[changed] = true;
  NEED_DISPATCH = true;
}

const OB = [];

let WATCHER_KEY = 1;
class Watcher {
  constructor(listener, namespace) {
    this.listener = listener;
    this.namespace = namespace;
    this.key = ++WATCHER_KEY;
    this.dispatchTime = 0;
  }
}
class Vendor {
  constructor() {
    this.libs = new Map();
    this.libs.set("__default", new Map());
  }
  put(watcher) {
    const { namespace = "__default", key } = watcher;
    let lib = this.libs.get(namespace);
    if (!lib) {
      lib = new Map();
      this.libs.set(namespace, lib);
    }
    lib.set(key, watcher);
  }
  getWatchers(namespace = "__default") {
    const lib = this.libs.get(namespace);
    return lib ? Object.values(lib) : []
  }
  destory() {
    this.libs = null;
  }
  remove(watcher) {
    const { namespace = "__default", key } = watcher;
    let lib = this.libs.get(namespace);
    if (!lib) {
      return;
    }
    lib.delete(key);
  }
}

const PUBLIC_VENDOR = new Vendor();
class Observer {
  static observe(listener) {
    const watcher = new Watcher(listener);
    PUBLIC_VENDOR.put(watcher);
    return {
      remove() {
        PUBLIC_VENDOR.remove(watcher);
      }
    }
  }
  static dispatch(payload) {
    const watchers = PUBLIC_VENDOR.getWatchers();
    watchers.forEach(watcher => {
      return watcher.listener.call(null, payload)
    })
  }
  constructor() {
    OB.push(this);
    this.vendor = new Vendor();
    this.pending = {};
    this.needDispatch = false;
  }
  destory() {
    OB.every((ob, index) => {
      if (ob === this) {
        OB.splice(index, 1);
        return false;
      }
      return true;
    });
    this.vendor.destory();
  }
  dispatch(namespace, payload) {
    const watchers = this.vendor.getWatchers(namespace);
    const defautWatchers = this.vendor.getWatchers();
    watchers.forEach(watcher => {
      return watcher.listener.call(null, payload)
    })
    defautWatchers.forEach(watcher => {
      return watcher.listener.call(null, payload)
    })
    Observer.dispatch(payload)
  }
  observe(namespace, listener) {
    if (typeof namespace === "function") {
      listener = namespace;
      namespace = undefined;
    }
    const watcher = new Watcher(listener, namespace);
    this.vendor.put(watcher);
    return {
      remove: () => {
        this.vendor.remove(watcher);
      }
    };
  }
}
export default Observer;

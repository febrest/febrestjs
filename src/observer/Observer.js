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

function doWatch() {
  if (!NEED_DISPATCH) {
    return;
  }
  let timestamp = Date.now();
  let changed = PENDING;
  NEED_DISPATCH = false;
  WATCHERS.forEach(function(watcher) {
    dispatchWatcher(watcher, changed, timestamp);
  });
  PENDING = {};
}
function pendingWatch(changed) {
  PENDING[changed] = true;
  NEED_DISPATCH = true;
}

const OB = [];

let WATCHER_KEY = 1;
class Wathcer {
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
    this.libs.push("__defalut", new Map());
  }
  put(watcher) {
    const { namespace = "__defalut", key } = watcher;
    let lib = this.libs.get(namespace);
    if (!lib) {
      lib = new Map();
      this.libs.set(namespace, lib);
    }
    lib.set(key, watcher);
  }
  destory() {
    this.libs = null;
  }
  remove(watcher) {
    const { namespace = "__defalut", key } = watcher;
    let lib = this.libs.get(namespace);
    if (!lib) {
      return;
    }
    lib.delete(key);
  }
}

const PUBLIC_VENDOR = new Vendor();
class Observer {
  static watch(listener) {
    const watcher = new Wathcer(listener);
    PUBLIC_VENDOR.put(watcher);
    return function() {
      PUBLIC_VENDOR.remove(watcher);
    };
  }
  constructor() {
    OB.push(this);
    this.vendor = new Vendor();
    this.pending = [];
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
  doWatch() {}
  watch(namespace, listener) {
    if (typeof namespace === "function") {
      listener = namespace;
      namespace = undefined;
    }
    const watcher = new Watcher(listener, namespace);
    this.vendor.put(watcher);
    return function() {
      this.vendor.remove(watcher);
    };
  }
  pendingWatch() {
    PENDING[changed] = true;
    NEED_DISPATCH = true;
    this.pending;
  }
}
export { watch, doWatch, pendingWatch, unwatch };

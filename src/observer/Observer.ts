"use strict";

export type ObserverListener = (event: any) => void;
let WATCHER_KEY = 1;
class Watcher {
  listener: ObserverListener;
  namespace: string | undefined;
  key: number;
  dispatchTime: number = 0;
  constructor(listener: ObserverListener, namespace?: string) {
    this.listener = listener;
    this.namespace = namespace;
    this.key = ++WATCHER_KEY;
    this.dispatchTime = 0;
  }
}
class Vendor {
  libs: Map<string, Map<number, Watcher>> = new Map();
  constructor() {
    this.libs.set("__default", new Map());
  }
  put(watcher: Watcher) {
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
    return lib;
  }
  destory() {
    this.libs = new Map();
  }
  remove(watcher: Watcher) {
    const { namespace = "__default", key } = watcher;
    let lib = this.libs.get(namespace);
    if (!lib) {
      return;
    }
    lib.delete(key);
  }
}

const PUBLIC_VENDOR = new Vendor();
const OB: Observer[] = [];

class Observer {
  static observe(listener: ObserverListener) {
    const watcher = new Watcher(listener);
    PUBLIC_VENDOR.put(watcher);
    return {
      remove() {
        PUBLIC_VENDOR.remove(watcher);
      }
    };
  }
  static dispatch(payload: any) {
    const watchers = PUBLIC_VENDOR.getWatchers();
    watchers &&
      watchers.forEach(watcher => {
        return watcher.listener.call(null, payload);
      });
  }
  vendor: Vendor = new Vendor();
  pending: { [key: string]: any } = {};
  needDispatch: boolean = false;

  constructor() {
    OB.push(this);
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
  dispatch(namespace: string, payload: any) {
    const watchers = this.vendor.getWatchers(namespace);
    const defautWatchers = this.vendor.getWatchers();
    watchers &&
      watchers.forEach(watcher => {
        return watcher.listener.call(null, payload);
      });
    defautWatchers &&
      defautWatchers.forEach(watcher => {
        return watcher.listener.call(null, payload);
      });
    Observer.dispatch(payload);
  }
  observe(
    namespace: string | ObserverListener | undefined,
    listener: ObserverListener
  ): { remove: () => void } {
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

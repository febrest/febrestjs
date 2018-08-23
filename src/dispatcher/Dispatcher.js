'use strict'

import { Observer, Bordercast } from './../observer';

/**
 * @description
 * 公共的dispatcher dispatch出来的action会被所有的dispatcher接收
 * 私有的dispatcher能接收所有的action，但是dispatch出去的action不会被其他dispatcher接收？
 */
class Dispatcher {
    constructor(isPublic) {
        this.observer = new Observer();
        this.bordercast = new Bordercast(isPublic);
        this.plugins = [];
    }
    dispatch(key: string, payload: any) {
      
    }
    release() {
        this.bordercast.release();
        this.observer.release();
    }
    subscribe(callback) {
        this.bordercast.subscribe(callback);
    }
    unsubcribe(callback) {
        this.bordercast.unsubscribe(callback)
    }
    watch(callback) {
        this.observer.watch(callback);
    }
    unwatch(callback) {
        this.observer.removeWatcher(callback)
    }
    plugin(plugin){
        this.plugins.push(plugin);
    }
    applyPlugin(hook,data){
        let plugins = this.plugins;
        plugins.forEach(plugin=>{
            plugin[hook] && plugin[hook].call(null,data);
        })
    }

}
export default Dispatcher;
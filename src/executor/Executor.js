'use strict'

import { makeError } from '../error';
class Executor {
    constructor() {
        this.adapters = {}
    }
    /**
     * 
     * @param {*} type 
     * @param {*} adapter 
     * 
     * todos:是否要做重复添加的检测
     */
    addAdapter(type, adapter) {
        this.adapters[type] = adapter;
    }
    fetch(origin, type, action, payload) {
        let adapter = this.adapters[type];
        if (!adapter) {
            makeError('can not find adapter for ' + type);
        }
        return adapter.fetch(origin, action, payload);
    }
    update(origin, type, action, payload) {
        let adapter = this.adapters[type];
        if (!adapter) {
            makeError('can not find adapter for ' + type);
        }
        return adapter.update(origin, action, payload);
    }
}

export default Executor;
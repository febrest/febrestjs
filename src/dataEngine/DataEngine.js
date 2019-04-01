'use strict'

import { makeError } from '../error';
class DataEngine {
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
    query(origin, type, method, payload) {
        let adapter = this.adapters[type];
        if (!adapter) {
            makeError('can not find adapter for ' + type);
        }
        return adapter.query(origin, method, payload);
    }
    update(origin, type, method, payload) {
        let adapter = this.adapters[type];
        if (!adapter) {
            makeError('can not find adapter for ' + type);
        }
        return adapter.update(origin, method, payload);
    }
}

export default DataEngine;
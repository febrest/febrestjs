'use strict'
import { inject, batchInject, all, getProvider } from './inject'
import { watch, unwatch } from './../observer'
import { query, update } from './dataEngine'
class Provider {
    static query = query;
    static update = update;
    static inject = inject;
    static batchInject = batchInject;
    static all = all;
    static getProvider = getProvider;
    static unwatch(provider, callback) {
        unwatch(provider, callback)
    }
    static watch(provider, callback) {
        watch(provider, callback)
    }
    name: string;
    constructor(name) {
        this.name = name || this.constructor.name;
        this.$typeof$ = 'Provider';
    }
    /*
    * 暂时不支持异步
    * 暂时没有要增加异步功能的打算
    */
    onCreate(state) {
        return state;
    }
    /**
     * 生命周期
     * 更新
     */
    onUpdate({ method, paylod, state }) {

    }
    /**
     * 生命周期
     * 查询
     */
    onQuery({ method, paylod, state }) {

    }
    /**
     * 生命周期
     * 销毁
     */
    // onDestory(state){

    // }
    /**
     * 
     */
    // onError({ method, paylod, error }) {
    //     console.error('provider error\nmethod:%s\npaylod:%o\nerror:%o', method, paylod, error);
    // }
    /**
     * 
     * @param {*} state 
     * @param {*} method 
     * @param {*} payload 
     */
    query(state, method, payload) {
        return state
    }
    update(state, method, payload) {
        return payload;
    }
}

export default Provider;
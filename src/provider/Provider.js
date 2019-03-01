'use strict'

class Provider {
    name: string;
    constructor(config) {
        this.name = config.name;
        this.$typeof$ = 'Provider';
        this.defaultState = config.defaultState;
    }
    onCreate(state) {
        return this.defaultState;
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
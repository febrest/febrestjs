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
    onUpdate({ action, paylod, state }) {

    }
    /**
     * 生命周期
     * 查询
     */
    onQuery({ action, paylod, state }) {

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
    // onError({ action, paylod, error }) {
    //     console.error('provider error\naction:%s\npaylod:%o\nerror:%o', action, paylod, error);
    // }
    /**
     * 
     * @param {*} state 
     * @param {*} action 
     * @param {*} payload 
     */
    query(state, action, payload) {
        return state
    }
    update(state, action, payload) {
        return payload;
    }
}

export default Provider;
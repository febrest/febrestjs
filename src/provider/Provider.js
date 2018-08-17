'use strict'

class Provider {
    name: string;
    constructor(config) {
        this.name = config.name;
    }
    /**
     * 创建
     */
    onCreate(state) {

    }
    /**
     * 生命周期
     * 更新
     */
    onUpdate(){

    }
    /**
     * 生命周期
     * 销毁
     */
    onDestory(state){

    }
  
    query(state,action,payload) {
        return state
    }
    update(state,action,payload) {
        return state;
    }
}

export default Provider;
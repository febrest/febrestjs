'use strict'

class Provider {
    name: string;
    constructor(config) {
        this.name = config.name;
        this.$typeof$ = 'Provider';
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
    onUpdate(state){

    }
    /**
     * 生命周期
     * 查询
     */
    onFetch(data){

    }
    /**
     * 生命周期
     * 销毁
     */
    onDestory(state){

    }
  
    fetch(state,action,payload) {
        return state
    }
    update(state,action,payload) {
        return payload;
    }
}

export default Provider;
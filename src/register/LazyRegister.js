'use strict'
import Register from './Register';
class LazyRegister extends Register {
    constructor(factory) {
        super(factory);
        this.lazy = {};
    }
    register(config) {
        if (Array.isArray(config)) {
            config.forEach(c => {
                this.register(c);
            })
        } else {
            this.lazy[config.name] = config;
        }
    }
    /**
     * 
     * @param {*} name 
     * todos: 异常检测
     */
    getDep(name) {
        let dep = this.container[name];
        let config;
        if (!dep && (config = this.lazy[name])) {
            dep = this.container[name] =this.factory(config);
            delete this.lazy[name];
        }
        return dep;
    }
}

export default LazyRegister;
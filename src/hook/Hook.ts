'use strict'
class Hook {
    constructor() {
        this.plugins = [];
    }
    apply(hook, data) {
        this.plugins.forEach(plugin => {
            if(plugin[hook]){
                plugin[hook](data);
            }
        })
    }
    plugin(plugin) {
        this.plugins.push(plugin)
    }
}

export default Hook;
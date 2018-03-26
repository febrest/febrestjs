'use strict'

'use strict'
import util from './../util';

var {
    toValue,
    copy,
    isArray,
    isObject
} = util;

class Provider{
    state: any;
    name: string;
    constructor(config){
        this.state = config.state;
        this.name = config.name;
    }
    get(){
        return copy(this.state);
    }
    set(state){
        this.state = copy(state);
    }
}

export default Provider;
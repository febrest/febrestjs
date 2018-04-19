'use strict'

import { toValue, copy, isArray, isObject } from './../util';

class Provider {
    state: any;
    name: string;
    constructor(config) {
        this.state = config.state;
        this.name = config.name;
    }
    getState() {
        return copy(this.state);
    }
    setState(state) {
        this.state = copy(state);
    }
}

export default Provider;
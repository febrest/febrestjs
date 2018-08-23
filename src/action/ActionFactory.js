'use strict'
import { makeError } from './../error';
function ActionFactory(config) {
    /**
    * todo:需要优化
    */
    let {
        controller,
        name
    } = config;
    if (typeof controller !== 'function') {
        makeError('illegal controller,the type of controller must be function,but got ' + (typeof controller));
    }
    return {
        controller,
        name
    }
}

export default ActionFactory;
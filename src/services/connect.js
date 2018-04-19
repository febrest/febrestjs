'use strict'
/**
 * @description 用于controller持续发出信号
 */


function noop(state) {
    return state;
}
function connect(action) {

    let {
        exec
    } = action;

    return function $connect(state) {
        action.controller = noop;
        action.args = [state];
        exec(action);
    }
}

export default connect;
'use strict'
import executor from './dataEngine'
import register from './register';
import { makeError } from '../error'


function query(name, action, payload) {
    let origin;
    // if ((origin = register.getState(name))) {
    //     return executor.query(origin, 'state', action, payload);
    // } else 
    if ((origin = register.getProvider(name))) {
        return executor.query(origin, 'provider', action, payload);
    } else {
        makeError(`找不到名为${name}的依赖，请检查依赖是否正确`);
    }
}
function batchQuery(querys) {
    /**
     * todos: 异常信息需要修改
     * */
    if (!Array.isArray(querys)) {
        makeError(`query error`);
    }
    /**
     * todos: 这里可能有异常catch不到
     * */
    return Promise.all(querys.map(({ name, action, payload }) => {
        return Promise.resolve(query(name, action, payload))
    }))
}
// function find(name, runtimeAction) {
//     let origin;
//     if ((origin = register.getState(name))) {
//         return executor.query(origin, 'state');
//     } else if ((origin = register.getProvider(name))) {
//         return function (action, payload) {
//            return executor.query(origin, 'provider', action, payload);
//         }
//     } else if ((origin = register.getService(name))) {
//         return origin(runtimeAction);
//     } else {
//         makeError(`找不到名为${name}的依赖，请检查依赖是否正确`);
//     }
// }
export {
    query,
    batchQuery
    // find
};
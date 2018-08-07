'use strict'
import Provider from './Provider'
import {makeError} from './../error';
var providerImpls = {
    'state': Provider
}
function getProviderImpl(type: String) {
    let providerImpl = providerImpls[type];
    /**找不到Provider的时候要抛出异常 */
    if (providerImpl) {
        return providerImpl
    } else {
        makeError('不存在类型为'+type+'的Provider');
    }
}


function createProvider(config) {
    let ProviderImpls = getProviderImpl(config.type || 'state');
    let type = typeof ProviderImpls;
    if (type === 'function') {
        return new ProviderImpls(config);
    } 
}
function use(type: String, providerImpl) {
    providerImpls[type] = providerImpl;
}

export {
    createProvider,
    use
}
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
    } else if (type === 'object') {
        let provider = new Provider(config);
        provider.getState = ProviderImpls.getState || provider.getState;
        provider.setState = ProviderImpls.setState || provider.setState;
        return provider;
    }
}
function use(type: String, providerImpl) {
    providerImpls[type] = providerImpl;
}

export default {
    createProvider,
    use
}
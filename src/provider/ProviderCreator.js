'use strict'
import Provider from './Provider'
var providerImpls = {
    'state':Provider
}
function getProviderImpl(type:String){
    let providerImpl = providerImpls[type];
    /**找不到Provider的时候要抛出异常 */
    if(providerImpl){
        return providerImpl
    }else{
        providerImpls['state'];
    }
}


function createProvider(config){
    let ProviderImpls = getProviderImpl(config.type||'state');
    let type = typeof ProviderImpls;
    if(type === 'function'){
        return new ProviderImpls(config);
    }else if(type === 'object' ){
        let provider = new Provider(config);
        provider.getState = ProviderImpls.getState;
        provider.setState = ProviderImpls.setState;
    }
}
function use(type:String,providerImpl){
    providerImpls[type] = providerImpl;
}

export default {
    createProvider,
    use
}
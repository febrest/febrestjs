'use strict'
class ProviderAdapter{
    fetch(provider,action,payload){
        return provider.fetch
    }
    update(provider,action,payload){
        return provider.update(action,payload);
    }
}

export default new ProviderAdapter();
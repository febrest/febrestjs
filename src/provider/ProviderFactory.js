'use strict'
import ProviderWrapper from './ProviderWrapper';
function ProviderFactory(config) {
    let provider = new ProviderWrapper(config);
    return {
        fetch:function(action,payload){
            return provider.fetch(action,payload);
        },
        update:function(){
            return provider.update(action,payload);
        }
    }
}

export default ProviderFactory;
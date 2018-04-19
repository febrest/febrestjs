'use strict';
import {
    ProviderContainer
} from './../provider';
import {
    doWatch
} from './../observer';
function persist(kv,state){
    if(!kv){
        return null;
    }
    var changed = {
        
    };
    for(let k in kv){
        let v = state[k];

        if(v){
            let name = kv[k];
            let provider = ProviderContainer.getProvider(name);
            if(provider){
                provider.set(v);
                changed[name] = true;
            }
        }      
    }
    doWatch(changed);
    return changed;
        
}

export default persist;
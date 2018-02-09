'use strict';
import ProviderContainer from './ProviderContainer';
import watcher from './watcher';
function persist(kv,state){
    if(!kv){
        return null;
    }
    var changed = {

    }
    for(let k in kv){
        let v = state[k];

        if(v){
            let name = kv[k];
            let provider = ProviderContainer.getProvider(name);
            if(provider){
                provider.set(v);
                changed[name] = v;
            }
        }      
    }
    watcher.doWatch(changed);
    return changed;
        
}

export default persist;
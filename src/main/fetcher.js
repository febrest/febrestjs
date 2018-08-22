'use strict'
import executor from './executor'
import register from './register';


function fetcher(name,action){
    let origin;
    if((origin=register.getState(name))){
        return executor.fetch(origin,'state');
    }else if((origin=register.getProvider(name))){
        return executor.fetch(origin,'provider');
    }else if((origin=register.getService(name))){
        return origin(action);
    }else{
        makeError(`找不到名为${name}的依赖，请检查依赖是否正确`); 
    }
}

export default fetcher;
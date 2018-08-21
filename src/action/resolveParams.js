
import { makeError } from '../error';
import {
    ServicesRegister,
    ProviderRegister,
    StateRegister
} from '../register'
function resolveParams(params) {
    if (!params) {
        return params;
    }
    return params.map(name => {
        let param = StateRegister.getDep(name)
                    || ProviderRegister.getDep(name) 
                    || ServicesRegister.getDep(name);
        if(!param){
            makeError(`找不到名为${name}的依赖，请检查依赖是否正确`);
        }
        switch(param.$typeof$){
            case 'State':
                return param.get();
            case 'ProviderExecutor':

            case 'Service':
                
        }   
        

    });
}
export default resolveParams;
import { getProvider } from '../provider';
import { getService } from '../services';
import { makeError } from '../error';

function resolveParams(params) {
    if (!params) {
        return params;
    }
    return params.map(name => {
        let param;
        if (name[0] === '$') {
            param = getService(name);
        } else {
            param = getProvider(name);
        }
        if(!param){
            makeError(`找不到名为${name}的${name[0]==='$'?'Service':'Provider'}，请检查依赖是否正确`);
        }else{
            return param;
        }
    });
}
export default resolveParams;
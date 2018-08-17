import { getProvider } from './../provider';
import { getService } from './../services';
import {makeError} from './../error';

function findDeps(params, deps = {}, callback) {
    if (!params) {
        return deps;
    }
    let promises = [];
    params.forEach(name => {
        let dep = deps[name];
        if (dep) {
            return dep;
        } else if (name[0] === '$') {
            dep = getService(name);
            if(!dep){
                makeError(`找不到名为${name}的service，请检查依赖是否正确`);
            }else {
                return dep;
            }
        } else {
            deps[name] = getProvider(name);
            if(!dep){
                makeError(`找不到名为${name}的Provider，请检查依赖是否正确`);
            }else {
                return dep;
            }

        }
    });
}
export default findDeps;
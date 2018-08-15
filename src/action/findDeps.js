import { getState } from './../provider';
import { getService } from './../services';
import { isPromise } from './../util';


function findDeps(params, deps = {},callback) {
    if (!params) {
        return deps;
    }
    let promises = [];
    params.forEach(name => {
        let dep = deps[name];
        if (dep) {
            return dep;
        } else if (name[0] === '$') {
            deps[name] = getService(name);
        } else {
            let stateGetter = getState(name);
            let stateGetterParams = stateGetter.params && findDeps(stateGetter.params, deps) || [];
            
        }
    });
}
export default findDeps;
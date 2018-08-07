import { getState} from './../provider';
import { getService } from './../services';


function findDeps(params, deps = {}) {
    if (!params) {
        return deps;
    }
    params.forEach(name => {
        let dep = deps[name];
        if (dep) {
            return dep;
        } else if (name[0] === '$') {
            deps[name] = getService(name);
        } else {
            let stateGetter = getState(name);
            stateGetter.params && findDep(stateGetter.params,deps);
            deps[depName] = stateGetter;
        }
    });
}
export default findDeps;
import { ProviderContainer } from './../provider';
import { getService } from './../services';
import { makeError } from './../error';



const { getProvider } = ProviderContainer;



/**
 * todos:可能还要优化
 */

function getProviderState(provider, action) {
    let getState = provider.getState;
    return Promise.all(dependencyLookup(_arguments(getState), action)).then(
        args => {
            return provider.checkLock().then(()=>{
                return getState.apply(provider, args);
            });
        }
    )
}
function lookForDeps(action) {
    let {deps={},params} = action.deps;
    if(!params){
        action.params = [];
    }else {
        action.params = params.map(depName => {
            let dep = deps[depName];
            if (dep) {
                return dep;
            } else if ((dep = getProvider(depName))) {
                deps[depName] = getProviderState(dep, action);
                return deps[depName];
            } else if (depName[0] === '$' && (dep===getService(depName, action))) {               
                deps[depName] = dep;
                return deps[depName];
            } else {
                makeError('不存在名为' + depName + '的依赖');
            }
        });
    }
    

}

export default lookForDeps;
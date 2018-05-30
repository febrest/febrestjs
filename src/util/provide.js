import { ProviderContainer } from './../provider';
import { getService } from './../services';
import { isArray, getArgumentList, then } from './../util';
import { makeError } from './../error';

const $FEBREST_ARGSLIST$ = '$FEBREST_ARGSLIST$';

const { getProvider } = ProviderContainer;



/**
 * todos:可能还要优化
 */

 function getProviderState(provider,action){
    let getState = provider.getState;
    dependencyLookup(_arguments(getState),action);
 }
function dependencyLookup(list, action) {
    let deps = action.deps;
    if (list) {
        return Promise.all(
            list.map(depName => {
                let provider;
                let dep = deps[depName];
                if (dep) {
                    return dep;
                } else if ((provider = getProvider(depName))) {
                    let getState = provider.getState;
                    return dependencyLookup(_arguments(getState), action).then(
                        args => {
                            deps[depName] = getState.apply(provider, args);
                            return deps[depName];
                        }
                    );
                } else if (depName[0] === '$') {
                    deps[depName] = getService(depName, action);
                    return deps[depName];
                } else {
                    //找不到依赖 抛出异常
                    makeError('不存在名为' + depName + '的依赖');
                }
            })
        )
    } else {
        return Promise.resolve([]);
    }
}
function _arguments(func) {
    let args = func[$FEBREST_ARGSLIST$];
    //获取arglist 这一步添加缓存，提高运行效率
    if (!args) {
        args = getArgumentList(func);
        func[$FEBREST_ARGSLIST$] = args;
    }
    return args;
}

function provide(func, action) {
    return dependencyLookup(_arguments(func), action);
}

export {
    provide,
    dependencyLookup
} ;
import { ProviderContainer } from './../provider';
import { getService } from './../services';
import { isArray } from './../util';
import { makeError } from './../error';
import { catchIt } from './../error';

const $FEBREST_ARGSLIST$ = '$FEBREST_ARGSLIST$';
const FEBREST_INJECTION = '$FEBREST_INJECTION$';


const { getProvider } = ProviderContainer;


/**
 * 获取参数列表
 */
function getArgumentList(func): Array {
    let funcS = func.toString();

    

    let argsRegExp = /\(([\s\S]*?)\)/;
    let match = funcS.match(argsRegExp);
    if (match&&match[1]) {
        /**
         * todo:可能有bug
         */
        let args;
        args = match[1].split(',').map((arg) => {
            let name = arg.replace(/(\s|=.+$)/g,'');
            return name;
        });
        return args;
    }
    return [];
}

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
function dependencyLookup(list, action) {
    let deps = action.deps;
    list = list || [];
    return list.map(depName => {
        let provider;
        let dep = deps[depName];
        if (dep) {
            return dep;
        } else if ((provider = getProvider(depName))) {
            deps[depName] = getProviderState(provider, action);
            return deps[depName];
        } else if (depName[0] === '$') {
            deps[depName] = getService(depName, action);
            return deps[depName];
        } else {
            makeError('不存在名为' + depName + '的依赖');
        }
    });

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
    return Promise.all(dependencyLookup(_arguments(func), action));
}

export {
    provide,
    dependencyLookup
};
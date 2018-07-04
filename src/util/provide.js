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
function argumentsFromFunc(func) {
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
    return null;
}

function argumentsFromPlugin(func){
    let funcS = func.toString();
    let argsRegExp = /@providers\s+=\s+\[([\w\s\,]+)\]/;
    if(argsRegExp.test(funcs)){
        return RegExp.$1.split(',').map((arg) => {
            let name = arg.replace(/(\s|=.+$)/g,'');
            return name;
        });
    }
    return null;

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

    /**
     * @description 获取参数，动态加载依赖
     * 先判断func下是否有$FEBREST_ARGSLIST$属性，有的话直接获取
     * 其次判断方法体内是否有'@providers=[]'字段，获取
     * 再次直接通过函数名获取
    */

    let args = func[$FEBREST_ARGSLIST$];
    if (!args) {
        args = argumentsFromPlugin(func)||argumentsFromFunc(func)||[];
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
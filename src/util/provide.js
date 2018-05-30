import { ProviderContainer } from './../provider';
import { getService } from './../services';
import { isArray, getArgumentList, then } from './../util';
import providerGetState from './providerGetState';
import {makeError} from './../error';

const $FEBREST_ARGSLIST$ = '$FEBREST_ARGSLIST$';

const { getProvider } = ProviderContainer;




/**
* todos:需要优化
*/
function dependencyLookup(list, action) {
    var isPayloadUsed = false;
    var args = [];
    if (list) {
        args = list.map(arg => {
            let provider = getProvider(arg);
            if (provider) {
                return providerGetState(provide,provider, action);
            } else if (arg[0] === '$') {
                return then(getService(arg, action));
            } else {
                //找不到依赖 抛出异常
                makeError('不存在名为' + arg + '的依赖');
            }
        });
    }
    return Promise.all(args);

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
    let args = _arguments(func);
    return dependencyLookup(args, action);
}

export default provide;
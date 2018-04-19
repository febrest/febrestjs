'use strict'

import {
    ProviderContainer
} from './../provider';

import {
    getService
} from './../services';

import util from './../util';


const {
    isArray,
    getArgumentList,
    then
} = util;

const {
    getProvider
} = ProviderContainer;

const $FEBREST_ARGSLIST$ = '$FEBREST_ARGSLIST$';

function providerGetState(provider, payload) {
    return provide(provider.getState, payload).then(args => {
        return provider.getState.apply(provider, args);
    });
}

/**
* todos:需要优化
*/
function dependencyLookup(list, payload) {
    var isPayloadUsed = false;
    var args = [];
    if (list) {
        args = list.map(key => {
            let provider = getProvider(key);
            if (provider) {
                return then(providerGetState(provider, payload));
            } else if (key[0] === '$') {
                return then(getService(key));
            } else {
                console.warn('不存在名为' + key + '的依赖');
                return then(undefined);
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
    return func;
}

function provide(func, payload) {
    let args = _arguments(func);
    return dependencyLookup(args, payload);
}

function provideMiddleWare(next) {
    return function (action, payload, id) {

    }
}

export default provideMiddleWare;
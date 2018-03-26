'use strict'

import util from './../util';
import ProviderContainer from './ProviderContainer';
import ProviderCreator from './ProviderCreator';


var {
    isArray,
    getArgumentList,
    then
} = util;

var {
    createProvider
} = ProviderCreator;
var {
    getProvider
} = ProviderContainer;

const $FEBREST_ARGSLIST$ = '$FEBREST_ARGSLIST$';

function dependencyLookup(list, payload) {
    var isPayloadUsed = false;
    var args = [];
    /**
     * 需要优化
    */
    if (list) {
        args =  list.map(function (key) {
            let provider = ProviderContainer.getProvider(key);
            if (provider) {
                /**
                 * provider get的时候传递payload
                 * 可能后期会修改
                 */
                return then(provider.get(payload));
            } else if (key==='payload') {
                /**
                 * 修改payload传递方式，限制只在参数名为payload的时候传递
                 */
                return then(payload);
            } else {
                console.warn('不存在名为'+key+'的依赖');
                return then(undefined);
            }
        })
    }
    return Promise.all(args);

}

function dependencyFromProvider(list){
    console.warn('谨慎使用，可能会被移除');
    var args = [];
    if(list){
        args = list.map(function(item){
           try{
               return then(item.get());
           }catch(e){
               return then(item)
           }
        });
    }
    return Promise.all(args);
}

function provide(action, payload) {
    var provider = action.provider;
    var controller = action.controller;
    if (typeof provider === 'function') {
        return dependencyFromProvider(provider(payload,createProvider,getProvider));
    }else{
        let argsList = controller[$FEBREST_ARGSLIST$];
        /**
         * 获取arglist 这一步添加缓存，提高运行效率
        */
        if(!argsList){
            argsList = getArgumentList(controller);
            controller[$FEBREST_ARGSLIST$] = argsList;
        }
        return dependencyLookup(argsList, payload);
    }
}

export default provide;
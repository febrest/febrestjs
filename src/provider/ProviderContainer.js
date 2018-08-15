'use strict'
import { makeError } from './../error';
import { paramsForFunction } from './../util';
const container = {

}
function getProvider(name) {
    return container[name];
}
function setProvider(name, provider) {
    container[name] = provider;
}
function getState(name) {
    let provider = getProvider(name);
    if (!provider) {
        return makeError('不存在名为' + name + '的依赖');
    }
    return {
        params: paramsForFunction(provider.getState),
        call: function (...args) {
            provider.getState(...args);
        }
    }


}
function setState(name, state) {

}
export {
    setProvider,
    getProvider,
    getState,
    setState
}
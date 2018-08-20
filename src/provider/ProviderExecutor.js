'use strict'
import { doWatch } from './../observer';
import { isPromise } from './../util';

function getState(state) {
    return state.get()
}
function setState(state, data) {
    state.set(data);
}
function ProviderExecutor(provider, state) {
    let _provider = provider;
    let _state = state;
    function query(action, payload) {
        return _provider.query(getState(_state),action, payload);
    }
    /**
     * 
     * @param {*} action 
     * @param {*} payload 
     * todos:update的时候异常捕获
     */
    function update(action, payload) {
        let data = _provider.update(getState(_state),action, payload);
        if (isPromise(data)) {
            data.then(v => {
                setState(_state,v);
                _provider.onUpdate(v);
                doWatch(_provider.name);
            })
        } else {
            setState(_state,data);
            _provider.onUpdate(data);
            doWatch(_provider.name);
        }
    }
    return {
        query,
        update
    }
}

export default ProviderExecutor;
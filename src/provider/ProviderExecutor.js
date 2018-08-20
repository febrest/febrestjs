'use strict'
import { doWatch } from './../observer';
import { isPromise } from './../util';

function getState(state) {
    state.get()
}
function setState(state, data) {
    state.set(data);
}
class ProviderExecutor {
    constructor(provider, state) {
        this.provider = provider;
        this.state = state;
    }
    query(action, payload) {
        let { state, provider } = this;
        return provider.query(getState(state),action, payload);
    }
    /**
     * 
     * @param {*} action 
     * @param {*} payload 
     * todos:update的时候异常捕获
     */
    update(action, payload) {
        let { state, provider } = this;
        let data = provider.update(getState(state),action, payload);
        if (isPromise(data)) {
            data.then(v => {
                setState(v);
                provider.onUpdate(v);
                doWatch(provider.name);
            })
        } else {
            setState(v);
            provider.onUpdate(v);
            doWatch(provider.name);
        }
    }
}

export default ProviderExecutor;
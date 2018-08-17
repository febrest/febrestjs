'use strict'
import { doWatch } from './../observer';
import { copy, isPromise } from './../util';

function getState(state) {
    copy(state.get());
}
function setState(state, data) {
    state.set(copy(data));
}
class ProviderExecutor {
    constructor(provider, state) {
        this.provider = provider;
        this.state = state;
    }
    query(action, payload) {
        let { state, provider } = this;
        return provider.query(action, payload, getState(state));
    }
    update(action, payload) {
        let { state, provider } = this;
        let data = provider.update(action, payload, getState(state));
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
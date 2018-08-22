'use strict'
import { isPromise } from '../util';
import Provider from './Provider';
import { State } from '../state';

function getState(state) {
    return state.get()
}
function setState(state, data) {
    state.set(data);
}

class ProviderWrapper {
    constructor(config) {
        this.$typeof$ = 'ProvideWrapper'
        this._state = state;
        this._provider = new Provider(config);
        this._state = new State(config.defaultState);
        this._provider.onCreate(getState(this._state));
    }

    fetch(action, payload) {
        let {
            _provider,
            _state
        } = this;
        return _provider.fetch(getState(_state), action, payload);
    }

    /**
     * 
     * @param {*} action 
     * @param {*} payload 
     * todos:update的时候异常捕获
     */
    update(action, payload) {
        let {
            _provider,
            _state
        } = this;
        let data = _provider.update(getState(), action, payload);
        if (isPromise(data)) {
            return data.then(v => {
                setState(_state, v);
                _provider.onUpdate(v);
            })
        } else {
            setState(_state, data);
            _provider.onUpdate(data);
        }
    }

}

export default ProviderWrapper;
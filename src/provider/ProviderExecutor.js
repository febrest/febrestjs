'use strict'
import { pendingWatch } from './../observer';
import { isPromise } from './../util';
import Provider from './Provider';
import { State } from './../state';
import { catchIt } from './../error';

function getState(state) {
    return state.get()
}
function setState(state, data) {
    state.set(data);
}

class ProviderExecutor {
    constructor(config) {
        this.$typeof$ = 'ProviderExecutor'
        this._state = state;
        this._provider = new Provider(config);
        this._state = new State(config.defaultState);
        this._provider.onCreate(getState(this._state));
    }

    query(action, payload) {
        let {
            _provider,
            _state
        } = this;
        return _provider.query(getState(_state), action, payload);
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
        try {
            let data = _provider.update(getState(), action, payload);
            if (isPromise(data)) {
                return data.then(v => {
                    setState(_state, v);
                    _provider.onUpdate(v);
                    pendingWatch(_provider.name);
                }).catch(catchIt);
            } else {
                setState(_state, data);
                _provider.onUpdate(data);
                pendingWatch(_provider.name);
            }
        } catch (e) {
            catchIt;
        }

    }

}

export default ProviderExecutor;
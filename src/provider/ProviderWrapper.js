'use strict'
import { isPromise } from '../util';
import Provider from './Provider';
import { State } from '../state';
import { immediate } from './../util';

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
    }

    fetch(action, payload) {
        let {
            _provider,
            _state
        } = this;
        let data;
        try {
            data = _provider.fetch(getState(_state), action, payload);
        } catch (error) {
            _provider.onError({ action, payload, error });
        }
        if (isPromise(data)) {
            return data.then(state => {
                immediate(() => _provider.onFetch({ action, payload, state: data }));
                return state;
            }, error => {
                _provider.onError({ action, payload, error });
                return error;
            }).catch(error => {
                _provider.onError({ action, payload, error });
                return error;
            });
        } else {
            immediate(() => _provider.onFetch({ action, payload, state: data }));
            return data;
        }
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
        let data
        try {
            data = _provider.update(getState(), action, payload);
        } catch (error) {
            return _provider.onError({ action, payload, error });
        }
        if (isPromise(data)) {
            return data.then(v => {
                setState(_state, state);
                _provider.onUpdate({ action, payload, state: state });
            }, error => {
                _provider.onError({ action, payload, error });
                return error;
            }).catch(error => {
                _provider.onError({ action, payload, error });
                return error;
            });
        } else {
            setState(_state, data);
            _provider.onUpdate({ action, payload, state: data });
            return Promise.resolve(data);
        }
    }

}

export default ProviderWrapper;
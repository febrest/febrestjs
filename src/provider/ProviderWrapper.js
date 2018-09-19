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
        let ProviderType = config.type || Provider
        this._provider = new ProviderType(config);
        this._state = new State(config.defaultState);
        this._created = false;
        if (this._provider.onCreate) {
            let _state = this._state;
            let state = this._provider.onCreate(getState(_state));
            if (state !== undefined) {
                if (isPromise(state)) {
                    state.then(state => {
                        setState(_state, state);
                        this._created = true;
                    });
                } else {
                    setState(_state, state);
                    this._created = true;
                }
            }else {
                this._created = true;
            }
        }
    }

    query(action, payload) {
        let {
            _provider,
            _state
        } = this;
        let data;
        data = _provider.query(getState(_state), action, payload);
        if (isPromise(data)) {
            return data.then(state => {
                immediate(() => _provider.onQuery({ action, payload, state: data }));
                return state;
            }, error => {
                return error;
            })
        } else {
            immediate(() => _provider.onQuery({ action, payload, state: data }));
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
        data = _provider.update(getState(_state), action, payload);
        if (isPromise(data)) {
            return data.then(v => {
                setState(_state, state);
                _provider.onUpdate({ action, payload, state: state });
            }, error => {
                return error;
            })
        } else {
            setState(_state, data);
            _provider.onUpdate({ action, payload, state: data });
            return Promise.resolve(data);
        }

    }

}

export default ProviderWrapper;
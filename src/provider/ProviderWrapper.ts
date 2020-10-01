'use strict';
import { isPromise, immediate } from '../util';
import { State } from '../state';
import { watch, doWatch, pendingWatch, unwatch } from './../observer';

function getState(state) {
  return state.get();
}
function setState(state, data) {
  state.set(data);
}
function updateComplete(name) {
  UPDATE_SIZE--;
  pendingWatch(name);
  if (UPDATE_SIZE <= 0 || Date.now() - LAST_DO_WATCH_TIME >= TINK) {
    doWatch();
  }
}

//最大触发时间间隔
const TINK = 200;

let UPDATE_SIZE = 0;
let LAST_DO_WATCH_TIME;

class ProviderWrapper {
  constructor(ProviderClass) {
    this.$typeof$ = 'ProvideWrapper';
    this._provider = new ProviderClass();
    this._state = new State();
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
      } else {
        this._created = true;
      }
    }
  }
  watch(callback) {
    watch(this._provider.name, callback);
  }
  unwatch(callback) {
    unwatch(this._provider.name, callback);
  }
  query(action, payload) {
    let { _provider, _state } = this;
    let data;
    data = _provider.query(getState(_state), action, payload);
    if (isPromise(data)) {
      return data.then(
        state => {
          immediate(() => _provider.onQuery({ action, payload, state: data }));
          return state;
        },
        error => {
          return error;
        }
      );
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
    UPDATE_SIZE++;

    let { _provider, _state } = this;
    let data;
    data = _provider.update(getState(_state), action, payload);
    if (isPromise(data)) {
      return data.then(
        state => {
          setState(_state, state);
          _provider.onUpdate({ action, payload, state: state });
          updateComplete(_provider.name);
        },
        error => {
          return error;
        }
      );
    } else {
      setState(_state, data);
      _provider.onUpdate({ action, payload, state: data });
      updateComplete(_provider.name);
      return Promise.resolve(data);
    }
  }
}

export default ProviderWrapper;

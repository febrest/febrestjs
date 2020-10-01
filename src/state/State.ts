import { ObserverWatcher } from 'observer/Observer';
import { copy, merge } from 'utils';

const STATE_MAP: Map<string, IState> = new Map<string, IState>();

export interface StateObserver {
  dispatch: (name: string, event: StateChangeEvent) => void;
  observe: (name: string, event: StateObserverListener) => ObserverWatcher;
}
export interface StateHook {
  get: (target: string) => void;
  set: (target: string) => void;
  replace: (target: string) => void;
  clear: (target: string) => void;
  toString: (target: string) => void;
  parse: (target: string) => void;
  observe: (target: string) => void;
}
export interface IState<T = any> {
  $type$: 'State';
  get: () => T;
  set: (data: T) => void;
  replace: (data: T) => void;
  clear: () => void;
  toString: () => string;
  parse: (v: string) => void;
  observe: (callback: StateObserverListener) => ObserverWatcher | undefined;
}
export type StateObserverListener = (event: StateChangeEvent) => void;
export interface StateChangeEvent {
  key: string;
  old: any;
  current: any;
}
let _observer: StateObserver | undefined;
class State<T = any> {
  data?: T;
  set(data: T) {
    const type = typeof data;
    const stateData = this.data;
    if (type !== typeof stateData || stateData === null || type !== 'object') {
      this.data = copy(data);
    } else {
      this.data = copy(merge(stateData, data));
    }
  }
  get(): T {
    return copy(this.data);
  }
  clear() {
    this.data = undefined;
  }
  replace(data: any) {
    this.data = copy(data);
  }
  toString() {
    const { data } = this;
    if (!data || typeof data === 'object') {
      return JSON.stringify(data);
    } else {
      return data + '';
    }
  }
  parse(v: string) {
    this.data = JSON.parse(v);
  }
}
function StateFactory<T = any>(name: string): IState<T> {
  const state = new State();
  const stateWrapper: IState<T> = {
    $type$: 'State',
    get(): T {
      return state.get();
    },
    set(data: T) {
      const old = state.get();
      state.set(data);
      const current = state.get();
      _observer && _observer.dispatch(name, { key: name, old, current });
    },
    replace(data: any) {
      const old = state.get();
      state.replace(data);
      const current = state.get();
      _observer && _observer.dispatch(name, { key: name, old, current });
    },
    clear() {
      const old = state.get();
      state.clear();
      _observer && _observer.dispatch(name, { key: name, old, current: null });
    },
    toString() {
      return state.toString();
    },
    parse(v: string) {
      state.parse(v);
    },
    observe: function(callback: StateObserverListener) {
      return _observer ? _observer.observe(name, callback) : undefined;
    },
  };
  STATE_MAP.set(name, stateWrapper);
  return stateWrapper;
}
function getOrCreateState<T>(name: string): IState<T> {
  const state: IState<T> = STATE_MAP.get(name) || StateFactory(name);
  return state;
}

function getStates(): { [key: string]: any } {
  const states: { [key: string]: any } = {};
  STATE_MAP.forEach((state, key) => {
    states[key] = state.get();
  });
  return states;
}
function setStates(states: { [key: string]: any }) {
  for (let s in states) {
    const state = getOrCreateState(s);
    state.set(states[s]);
  }
}
function batch(
  updater: ((states: { [key: string]: any }) => void) | { [key: string]: any }
) {
  if (updater && typeof updater === 'function') {
    updater(getStates());
  } else {
    setStates(updater);
  }
}
function setObserver(observer: StateObserver) {
  _observer = observer;
}

export { getOrCreateState as state, batch, setObserver };

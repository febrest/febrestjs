import { ObserverListener, ObserverWatcher } from "observer/Observer";
import { copy, merge } from "utils";

const STATE_MAP = new Map();

export interface StateObserver {
  dispatch: (name: string, event: StateChangeEvent) => void;
  observe: (name: string, event: StateObserverListener) => ObserverWatcher;
}

export interface IState {
  $type$: "State";
  get: () => any;
  set: (data: any) => void;
  replace: (data: any) => void;
  clear: () => void;
  toString: () => string;
  observe: (callback: StateObserverListener) => ObserverWatcher | undefined;
}
export type StateObserverListener = (event: StateChangeEvent) => void;
export interface StateChangeEvent {
  key: string;
  old: any;
  current: any;
}
let _observer: StateObserver | undefined;
class State {
  data: any = null;
  set(data: any) {
    const type = typeof data;
    const stateData = this.data;
    if (type !== typeof stateData || stateData === null || type !== "object") {
      this.data = copy(data);
    } else {
      this.data = copy(merge(stateData, data));
    }
  }
  get() {
    return copy(this.data);
  }
  clear() {
    this.data = null;
  }
  replace(data: any) {
    this.data = copy(data);
  }
  toString() {
    return JSON.stringify(this.data);
  }
  parse(string: string) {
    this.data = JSON.parse(string);
  }
}
function StateFactory(name: string): IState {
  const state = new State();
  const stateWrapper: IState = {
    $type$: "State",
    get: function() {
      return state.get();
    },
    set: function(data: any) {
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
    observe: function(callback: StateObserverListener) {
      return _observer ? _observer.observe(name, callback) : undefined;
    }
  };
  STATE_MAP.set(name, stateWrapper);
  return stateWrapper;
}
function getOrCreateState(name: string) {
  const state = STATE_MAP.get(name) || StateFactory(name);
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
  if (updater && typeof updater === "function") {
    updater(getStates());
  } else {
    setStates(updater);
  }
}
function setObserver(observer: StateObserver) {
  _observer = observer;
}
export { getOrCreateState as state, batch, setObserver };

import { copy, merge } from "../util";
const STATE_MAP = new Map();
let _observer;
class State {
  constructor() {
    this.data = null;
  }
  set(data) {
    const type = typeof data;
    const stateData = this.data;
    if (type !== typeof stateData || type !== "object") {
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
  replace(data) {
    this.data = copy(data);
  }
  toString() {
    return JSON.stringify(this.data);
  }
  parse(string) {
    this.data = JSON.parse(string);
  }
}
function StateFactory(name) {
  const state = new State();
  const stateWrapper = {
    $type$: "State",
    get: function() {
      return state.get();
    },
    set: function(data) {
      const old = state.get();
      state.set(data);
      const current = state.get();
      _observer && _observer.dispatch(name, { key: name, old, current });
    },
    replace(data) {
      const old = state.get();
      state.replace(data);
      const current = state.get();
      _observer && _observer.dispatch(name, { key: name, old, current });
    },
    observe: function(callback) {
      return _observer && _observer.observe(name, callback);
    }
  };
  STATE_MAP.set(name, stateWrapper);
  return stateWrapper;
}
function getOrCreateState(name) {
  const state = STATE_MAP.get(name) || StateFactory(name);
  return state;
}

function getStates() {
  const states = {};
  STATE_MAP.forEach((state, key) => {
    states[key] = state.get();
  });
  return states;
}
function setStates(states) {
  for (let s in states) {
    const state = getOrCreateState(s);
    state.set(states[s]);
  }
}
function batch(updater) {
  if (updater && typeof updater === "function") {
    updater(getStates());
  } else {
    setStates(updater);
  }
}
function setObserver(observer) {
  _observer = observer;
}
export { getOrCreateState as state, batch, setObserver };

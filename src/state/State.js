import { copy } from "../util";
const STATE_MAP = new Map();
let _observer;
class State {
  constructor() {
    this.data = null;
  }
  set(data) {
    this.data = copy(data);
  }
  get() {
    return copy(this.data);
  }
  toString() {
    return JSON.stringify(this.data);
  }
  parse(string) {
    this.data = JSON.parse(string);
  }
}
function StateFactory(name, observer) {
  const state = new State();
  const stateWrapper = {
    $type$: "State",
    get: function() {
      return state.get();
    },
    set: function(data) {
      state.set(data);
      observer.dispatch(name, { key: name, data });
    },
    observe: function(callback) {
      return observer.observe(name, callback);
    }
  };
  STATE_MAP.set(name, stateWrapper);
  return stateWrapper;
}
function getOrCreateState(name, observer) {
  _observer = observer;
  const state = STATE_MAP.get(name) || StateFactory(name, observer);
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
    const state = getOrCreateState(s, _observer);
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
export { getOrCreateState as state, batch };

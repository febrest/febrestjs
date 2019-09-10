import { copy } from "../util";
const STATE_MAP = new Map();
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
      return state.set(data);
    },
    watch: function(callback) {
      return observer.watch(name, callback);
    },
    unwatch: function(callback) {
      observer.unwatch(name, callback);
    }
  };
  STATE_MAP.set(name, stateWrapper);
  return stateWrapper;
}
function getOrCreateState(name, observer) {
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
    const state = STATE_MAP.get(s);
    if (state) {
      state.set(states[s]);
    }
  }
}
function batch(updater) {
  if (updater && typeof updater === "function") {
    updater(getStates());
  }esle{
    setStates(updater)
  }
}
export { getOrCreateState, batch };

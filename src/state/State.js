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
function StateFactory(name) {
  const state = new State();
  const stateWrapper = {
    $type$: "State",
    get: function() {
      return state.get();
    },
    set: function(data) {
      return state.set(data);
    }
  };
  STATE_MAP.set(name, stateWrapper);
  return stateWrapper;
}
function getOrCreateState(name) {
  const state = STATE_MAP.get(name) || StateFactory(name);
  return state;
}

export default getOrCreateState;

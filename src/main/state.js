import { batch, state as s } from "./../state";

import Observer from "./../observer";

const observer = new Observer();
const state = function(name) {
  return s(name, observer);
};
state.observe = function(l) {
  return observer.observe(l);
};
state.batch = batch;

export default state;

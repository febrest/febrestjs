import { batch, state as s, setObserver } from "./../state";

import Observer from "./../observer";

const observer = new Observer();

setObserver(observer);

const state = function (name) {
  return s(name);
};

state.observe = function (l) {
  return observer.observe(l);
};
state.batch = batch;

export default state;

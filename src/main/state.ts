import { batch, state as s, setObserver } from "./../state";

import Observer from "observer";
import { ObserverListener } from "observer/Observer";

const observer = new Observer();

setObserver(observer);

const state = function(name: string) {
  return s(name);
};

state.observe = function(l: ObserverListener) {
  return observer.observe(l);
};
state.batch = batch;

export default state;

import { batch, state as s, setObserver } from "state";

import { IState } from "state/State";
import Observer from "observer";
import { ObserverListener } from "observer/Observer";

const observer = new Observer();

setObserver(observer);

const state: State = function(name: string) {
  return s(name);
};

type StateFunction = (name: string) => IState;
export interface State extends StateFunction {
  observe: (l: ObserverListener) => void;
  batch: (
    updater: ((states: { [key: string]: any }) => void) | { [key: string]: any }
  ) => void;
}
state.observe = function(l: ObserverListener) {
  return observer.observe(l);
};
state.batch = batch;

export default state;

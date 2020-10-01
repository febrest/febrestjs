import { batch, state as s, setObserver } from 'state';

import { IState } from 'state/State';
import Observer from 'observer';
import { ObserverListener } from 'observer/Observer';

const observer = new Observer();

setObserver(observer);

function state<T>(name: string): IState<T> {
  return s<T>(name);
}

type StateFunction<T> = (name: string) => IState<T>;
export interface State<T = any> extends StateFunction<T> {
  observe(l: ObserverListener): void;
  batch(
    updater: ((states: { [key: string]: any }) => void) | { [key: string]: any }
  ): void;
}
state.observe = function(l: ObserverListener) {
  return observer.observe(l);
};
state.batch = batch;

export default state;

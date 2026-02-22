import Observer from 'observer';
import { ObserverListener } from 'observer/observer';

export type ObserveFunction = (l: ObserverListener) => void;
const observe: ObserveFunction = function (l: ObserverListener) {
  return Observer.observe(l);
};

export { observe };

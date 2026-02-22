import Observer from './../observer';
import type { ObserverListener } from './../observer/observer';

export type ObserveFunction = (l: ObserverListener) => void;
export const observe: ObserveFunction = (l: ObserverListener) => {
  return Observer.observe(l);
};

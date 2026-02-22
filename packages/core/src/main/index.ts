import {
  postMessage as broadcast,
  subscribe,
  unsubscribe,
} from './broadcast';
import state from './state';

import invoker from './invoker';
import { observe } from './observer';

export const dispatch = invoker.invoke;
export const plugin = invoker.plugin;
export const onError = invoker.onError;
export const State = state;
export { subscribe, unsubscribe, broadcast, observe };

const Febrest = {
  dispatch,
  plugin,
  onError,
  State,
  subscribe,
  unsubscribe,
  broadcast,
  observe,
};

export default Febrest;

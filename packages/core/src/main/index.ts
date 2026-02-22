import {
  postMessage as broadcast,
  subscribe,
  unsubscribe,
  SubscribeFunction,
  UnsubscribeFunction,
  PostMessageFunction,
} from './broadcast';
import state from './state';

import invoker, { type InvokerEntity } from './invoker';
import { observe } from './observer';
import type { ObserveFunction } from './observer';

const export_keys = {
  dispatch: true,
  subscribe: true,
  unsubscribe: true,
  State: true,
  plugin: true,
  action: true,
  broadcast: true,
  onError: true,
};
// export interface Febrest {
//   dispatch<T = any, S = any>(ctrl: Controller<T, S>, payload: T): Promise<S>;
//   plugin(plugin: ActionPlugin): void;
//   onError(error: ErrorCallback): void;
//   subscribe(callback: BroadcastEventListener): void;
//   unsubscribe(callback: BroadcastEventListener): void;
//   broadcast<T = any>(cmd: string, data: T): void;
//   State;
//   observe(l: ObserverListener): void;
// }

export const dispatch: InvokerEntity['invoke'] = invoker.invoke;
export const plugin: InvokerEntity['plugin'] = invoker.plugin;
export const onError: InvokerEntity['onError'] = invoker.onError;
export const State = state;
export { subscribe, unsubscribe, broadcast, observe };

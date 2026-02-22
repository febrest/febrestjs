'use strict';

import {
  postMessage as broadcast,
  subscribe,
  unsubscribe,
  SubscribeFunction,
  UnsubscribeFunction,
  PostMessageFunction,
} from './broadcast';
import state, { State } from './state';

import invoker, { InvokerEntity } from './invoker';
import { observe, ObserveFunction } from './observer';

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

const febrest: Febrest = {
  dispatch: invoker.invoke,
  plugin: invoker.plugin,
  onError: invoker.onError,
  subscribe,
  unsubscribe,
  broadcast,
  State: state,
  observe,
};
export interface Febrest {
  dispatch: InvokerEntity['invoke'];
  plugin: InvokerEntity['plugin'];
  onError: InvokerEntity['onError'];
  subscribe: SubscribeFunction;
  unsubscribe: UnsubscribeFunction;
  broadcast: PostMessageFunction;
  State: State;
  observe: ObserveFunction;
}
export default febrest;

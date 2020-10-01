import { Broadcast } from 'broadcast';
import { BroadcastEventListener } from 'broadcast/Broadcast';

const broadcast = new Broadcast();

export type SubscribeFunction = (callback: BroadcastEventListener) => void;
export type UnsubscribeFunction = (callback: BroadcastEventListener) => void;

export type PostMessageFunction = <T = any>(cmd: string, data?: T) => void;

const subscribe: SubscribeFunction = function subscribe(
  callback: BroadcastEventListener
): void {
  broadcast.subscribe(callback);
};

const unsubscribe: UnsubscribeFunction = function unsubscribe(
  callback: BroadcastEventListener
): void {
  broadcast.unsubscribe(callback);
};

const postMessage: PostMessageFunction = function<T = any>(
  cmd: string,
  data?: T
): void {
  broadcast.message(cmd, data);
};

export { subscribe, unsubscribe, postMessage };

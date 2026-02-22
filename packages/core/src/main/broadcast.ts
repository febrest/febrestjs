import { Broadcast } from './../broadcast';
import type { BroadcastEventListener } from './../broadcast/broadcast';

const broadcast = new Broadcast();

export type SubscribeFunction = (callback: BroadcastEventListener) => void;
export type UnsubscribeFunction = (callback: BroadcastEventListener) => void;

export type PostMessageFunction = <T = any>(cmd: string, data?: T) => void;

export const subscribe: SubscribeFunction = function subscribe(
  callback: BroadcastEventListener
): void {
  broadcast.subscribe(callback);
};

export const unsubscribe: UnsubscribeFunction = function unsubscribe(
  callback: BroadcastEventListener
): void {
  broadcast.unsubscribe(callback);
};

export const postMessage: PostMessageFunction = <T = any>(
  cmd: string,
  data?: T
): void => {
  broadcast.message(cmd, data);
};

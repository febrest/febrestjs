import { Broadcast } from "broadcast";
import { BroadcastEventListener } from "broadcast/Broadcast";

const broadcast = new Broadcast();

const subscribe = function(callback: BroadcastEventListener) {
  broadcast.subscribe(callback);
};
const unsubscribe = function(callback: BroadcastEventListener) {
  broadcast.unsubscribe(callback);
};
const postMessage = function(cmd: string, data: any) {
  broadcast.message(cmd, data);
};

export { subscribe, unsubscribe, postMessage };

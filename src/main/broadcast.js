import { Broadcast } from "../broadcast";

const broadcast = new Broadcast();

const subscribe = function(callback) {
  broadcast.subscribe(callback);
};
const unsubscribe = function(callback) {
  broadcast.unsubscribe(callback);
};
const postMessage = function(cmd, data) {
  broadcast.message(cmd, data);
};

export { subscribe, unsubscribe, postMessage };

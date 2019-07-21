import { Bordercast } from './../bordercast';

const bordercast = new Bordercast();

const subscribe = function (callback) {
    bordercast.subscribe(callback);
}
const unsubscribe = function (callback) {
    bordercast.unsubscribe(callback);
}
const postMessage = function (cmd, data) {
    bordercast.message(cmd, data)
}

export {
    subscribe,
    unsubscribe,
    postMessage
}
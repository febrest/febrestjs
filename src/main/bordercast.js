import { Bordercast } from './../observer';

const bordercast = new Bordercast();

const subscribe = function (callback) {
    bordercast.subscribe(callback);
}
const unsubscribe = function (callback) {
    bordercast.unsubscribe(callback);
}
const message = function (cmd, data) {
    bordercast.message(cmd, data)
}

export {
    subscribe,
    unsubscribe,
    message
}
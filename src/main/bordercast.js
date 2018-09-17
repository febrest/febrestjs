import { Bordercast } from './../observer';

const bordercast = new Bordercast();

const subscribe = function (callback) {
    bordercast.subscribe(callback);
}
const unsubscribe = function (callback) {
    bordercast.unsubscribe(callback);
}
const message = function (data) {
    bordercast.message(data)
}

export {
    subscribe,
    unsubscribe,
    message
}
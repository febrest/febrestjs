'use strict'



class Bordercast {
    constructor() {
        this._listeners = [];

    }
    _message(cmd, data) {
        let event = {
            cmd,
            data
        }
        this._listeners.forEach((callback) => {
            callback(event);
        });
    }
    message(cmd, data) {
        this._message(cmd, data);
    }
    subscribe(callback) {
        this._listeners.push(callback);
    }
    release() {
        this._listeners = null;
    }
    unsubscribe(callback) {
        let listeners = this._listeners;
        for (let i = listeners.length - 1; i >= 0; i--) {
            if (listeners[i] === callback) {
                listeners.splice(i, 1);
                return;
            }
        }
    }
}

export default Bordercast;
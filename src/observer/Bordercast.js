'use strict'


const PUBLIC_BORDERCAST = [];
const BORDERCAST = [];

let ID = -1;

class Bordercast {
    constructor(isPublic) {
        this._listeners = [];
        this._id = ++ID;
        this._public = isPublic;
        BORDERCAST[this._id] = this;
    }
    _message(data) {
        this._listeners.forEach((callback) => {
            callback(data);
        });
    }
    /**
     * 如果公共频道所有的都能接收
     * 否则只自己接收
     * 公共的话就dispatcher所有的
     */
    message(data) {
        if (this._public) {
            BORDERCAST.forEach(bordercast => {
                bordercast._message(data);
            });
        }else{
            bordercast._message(data);
        }
    }
    subscribe(callback) {
        this._listeners.push(callback);
    }
    release() {
        this._listeners = null;
        if (this._id !== undefined) {
            delete PUBLIC_BORDERCAST[this._id];
        }
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
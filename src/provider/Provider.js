'use strict'

import { toValue, copy, isArray, isObject } from './../util';

class Provider {
    state: any;
    name: string;
    constructor(config) {
        this.state = config.state;
        this.name = config.name;
        this._isLock = false;
        this._lockPromise;
        this._lockResolve
    }
    lock(){
        if(this._isLock){
            return;
        }
        this._isLock = true;
        this._lockPromise = new Promise((resolve)=>{
            this._lockResolve = resolve;
        });
    }
    resolvelock(){
        this._lockResolve();
        this._isLock = false;
        this._lockResolve = undefined;
        this._lockPromise = undefined;
    }
    checkLock(){
        if(!this._isLock){
            return Promise.resolve();
        }else{
            return this._lockPromise
        }
    }
    getState() {
        return copy(this.state);
    }
    setState(state) {
        this.state = copy(state);
    }
}

export default Provider;
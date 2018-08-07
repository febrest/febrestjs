'use strict'

class Provider {
    state: any;
    name: string;
    constructor(config) {
        this.state = config.state;
        this.name = config.name;
        this._lockPromise;
        this._lockResolve;
        this._lockTick = 0;
    }
    lock() {
        this._lockTick++;
        if (!this._lockPromise) {
            this._lockPromise = new Promise((resolve) => {
                this._lockResolve = resolve;
            });
        }
    }
    resolvelock() {
        this._lockTick--;
        if (this._lockTick <= 0) {
            this._lockTick = 0;
            this._lockResolve();
            this._lockResolve = undefined;
            this._lockPromise = undefined;
        }
    }
    checkLock() {
        if (this._lockTick <= 0) {
            return Promise.resolve();
        } else {
            return this._lockPromise
        }
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
}

export default Provider;
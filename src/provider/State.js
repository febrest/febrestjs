import { copy } from './../util';

class State {
    constructor(data) {
        this.data = data !== undefined ? copy(data) : { };
    }
    onCreate() {

    }
    onDestory() {
        this.data = null;
    }
    set(data) {
        this.data = copy(data);
    }
    get() {
        return copy(this.data);
    }
    toString() {
        return JSON.stringify(this.data);
    }
    parse(string) {
        this.data = JSON.parse(string)
    }
}

export default State;
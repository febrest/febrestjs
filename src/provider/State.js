class State {
    constructor(data) {
        this.data = data || {};
    }
    onCreate() {

    }
    onDestory() {
        this.data = null;
    }
    set(data) {
        this.data = data;
    }
    get() {
        return this.data;
    }
    toString() {
        return JSON.stringify(this.data);
    }
    parse(string) {
        this.data = JSON.parse(string)
    }
}

export default State;
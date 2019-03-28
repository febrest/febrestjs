class ActionRegister {
    constructor() {
        this.actions = new Map();
    }
    registerAction(namespace, actions) {
        if (typeof namespace !== 'string') {
            actions = namespace;
            namespace = ''
        } else {
            namespace = namespace + '.';
        }
        for (let name in actions) {
            this.actions.set(namespace + name, actions[name]);
        }
    }
    getAction(name) {
        let action = this.actions.get(name);
        return action;
    }
}

export default new ActionRegister();
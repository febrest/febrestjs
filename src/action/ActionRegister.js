function underScoreName(name) {
  return name.replce(/_[\w]/g, m => {
    return m[1].toUpperCase();
  });
}
class ActionRegister {
  constructor() {
    this.actions = new Map();
  }
  registerAction(namespace, actions) {
    if (typeof namespace !== "string") {
      actions = namespace;
      namespace = "";
    } else {
      namespace = namespace + ".";
    }
    for (let name in actions) {
      this.actions.set(namespace + name, actions[name]);
    }
  }
  getAction(name) {
    let action =
      this.actions.get(name) || this.actions.get(underScoreName(name));
    return action;
  }
}

export default new ActionRegister();

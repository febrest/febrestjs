function underScoreName(name: string) {
  return name.replace(/_[\w]/g, m => {
    return m[1].toUpperCase();
  });
}
class ActionRegister {
  actions: Map<string, (payload: any) => void> = new Map();
  constructor() {
    this.actions = new Map();
  }
  registerAction(namespace: string, actions: any) {
    if (typeof namespace !== 'string') {
      actions = namespace;
      namespace = '';
    } else {
      namespace = namespace + '.';
    }
    for (let name in actions) {
      this.actions.set(namespace + name, actions[name]);
    }
  }
  getAction(name: string) {
    let action =
      this.actions.get(name) || this.actions.get(underScoreName(name));
    return action;
  }
}

export default new ActionRegister();

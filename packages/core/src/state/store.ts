export class Store {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  setState(key: string, value: any) {
    (this as any)[key] = value;
  }
  getState(key: string) {
    return (this as any)[key];
  }
  onEffect(effect: (key: string, value: any) => void) {}
  offEffect(effect: (key: string, value: any) => void) {}
}

export const createStore = (name: string) => {
  return new Store(name);
};
export const DefaultStore = createStore('default');

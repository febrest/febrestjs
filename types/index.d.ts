declare module "febrest" {
  export interface RuntimeAction {
    $typeof$: "RuntimeAction";
    stage: string;
    name: string;
    controller: ((payload: any) => any) | undefined;
    payload: any;
    result: any;
    error: Error | undefined;
  }
  export interface ActionPlugin {
    initialized: (
      action: RuntimeAction
    ) => RuntimeAction | Promise<RuntimeAction>;
    close: (data: RuntimeAction) => RuntimeAction | Promise<RuntimeAction>;
  }
  export type BroadcastEventListener = (event: BroadcastEvent) => void;
  export type ObserverListener = (event: any) => void;

  type StateFunction = (name: string) => IState;
  export interface IState {
    $type$: "State";
    get: () => any;
    set: (data: any) => void;
    replace: (data: any) => void;
    clear: () => void;
    toString: () => string;
    observe: (callback: StateObserverListener) => ObserverWatcher | undefined;
  }
  export interface StateChangeEvent {
    key: string;
    old: any;
    current: any;
  }
  export interface ObserverWatcher {
    remove: () => void;
  }
  export type StateObserverListener = (event: StateChangeEvent) => void;

  export interface State extends StateFunction {
    observe: (l: ObserverListener) => void;
    batch: (
      updater:
        | ((states: { [key: string]: any }) => void)
        | { [key: string]: any }
    ) => void;
  }
  export interface BroadcastEvent {
    cmd: string;
    data: any;
  }
  export interface Febrest {
    action: (namespace: string, actions: any) => void;
    dispatch: (
      ctrl: string | ((payload: any) => any),
      payload: any
    ) => Promise<any>;
    plugin: (lugin: ActionPlugin) => void;
    onError: (error: (error: any) => boolean) => void;
    subscribe: (callback: BroadcastEventListener) => void;
    unsubscribe: (callback: BroadcastEventListener) => void;
    broadcast: (cmd: string, data: any) => void;
    State: State;
    observe: (l: ObserverListener) => void;
    version: string;
  }
}

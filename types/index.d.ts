declare module 'febrest' {
  export interface RuntimeAction {
    $typeof$: 'RuntimeAction';
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
    ) => RuntimeAction | Promise<RuntimeAction> | void;
    close: (
      data: RuntimeAction
    ) => RuntimeAction | Promise<RuntimeAction> | void;
  }
  export type BroadcastEventListener = (event: BroadcastEvent) => void;
  export type ObserverListener = (event: any) => void;

  type StateFunction = (name: string) => IState;
  export interface IState {
    $type$: 'State';
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

  interface StateStatic extends StateFunction {
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
  type PluginFunction = (plugin: ActionPlugin) => void;
  type ActionFunction = (namespace: string, actions: any) => void;
  type DispatchFunction = (
    ctrl: string | ((payload: any) => any),
    payload?: any
  ) => Promise<any>;
  type OnErrorFunction = (error: (error: any) => boolean) => void;
  type SubscribeFunction = (callback: BroadcastEventListener) => void;
  type UnsubscribeFunction = (callback: BroadcastEventListener) => void;
  type BroadcastFunction = (cmd: string, data: any) => void;
  type ObserveFunction = (l: ObserverListener) => void;
  export const plugin: PluginFunction;
  export const action: ActionFunction;
  export const dispatch: DispatchFunction;
  export const subscribe: SubscribeFunction;
  export const unsubscribe: UnsubscribeFunction;
  export const broadcast: BroadcastFunction;
  export const State: StateStatic;
  export const observe: ObserveFunction;
  const Febrest: {
    action: ActionFunction;
    dispatch: DispatchFunction;
    plugin: PluginFunction;
    onError: OnErrorFunction;
    subscribe: SubscribeFunction;
    unsubscribe: UnsubscribeFunction;
    broadcast: BroadcastFunction;
    State: StateStatic;
    observe: ObserveFunction;
    version: string;
  };
  export default Febrest;
}

declare module 'febrest' {
  export type Controller<T, S> = (payload?: T) => S;
  export interface RuntimeAction<T = any, S = any> {
    $typeof$: 'RuntimeAction';
    stage: string;
    controller?: Controller<T, S>;
    payload?: T;
    result?: S;
    error?: Error;
  }
  export interface ActionPlugin {
    initialized<T = any, S = any>(
      action: RuntimeAction<T, S>
    ): RuntimeAction<T, S> | Promise<RuntimeAction<T, S>>;
    exception<T = any, S = any>(
      data: RuntimeAction<T, S>
    ): RuntimeAction<T, S> | Promise<RuntimeAction<T, S>>;
    close<T = any, S = any>(
      data: RuntimeAction<T, S>
    ): RuntimeAction<T, S> | Promise<RuntimeAction<T, S>>;
  }
  export interface BroadcastEvent<T = any> {
    cmd: string;
    data?: T;
  }
  export type BroadcastEventListener<T = any> = (
    event: BroadcastEvent<T>
  ) => void;
  export type ObserverListener = (event: any) => void;

  type StateFunction<T> = (name: string) => IState<T>;
  export interface IState<T = any> {
    $type$: 'State';
    get: () => T;
    set: (data: T) => void;
    replace: (data: T) => void;
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

  interface StateStatic<T = any> extends StateFunction<T> {
    observe: (l: ObserverListener) => void;
    batch: (
      updater:
        | ((states: { [key: string]: any }) => void)
        | { [key: string]: any }
    ) => void;
  }
  export interface BroadcastEvent<T = any> {
    cmd: string;
    data?: T;
  }
  export function plugin(plugin: ActionPlugin): void;
  export function dispatch<T, S>(
    ctrl: Controller<T, S>,
    payload?: T
  ): Promise<S>;
  export function onError(error: (error: Error) => boolean): void;
  export function subscribe(callback: BroadcastEventListener): void;
  export function unsubscribe(callback: BroadcastEventListener): void;
  export function broadcast(cmd: string, data: any): void;
  export function observe(l: ObserverListener): void;
  export const State: StateStatic;
  const Febrest: {
    dispatch;
    plugin;
    onError;
    subscribe;
    unsubscribe;
    broadcast;
    State;
    observe;
    version: string;
  };
  export default Febrest;
}

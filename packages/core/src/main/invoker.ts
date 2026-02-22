import type { ActionPlugin, ErrorCallback } from 'invoker/invoker';

import { Invoker } from 'invoker';
import actionEngine from './action-engine';
import type { Controller } from './../action/runtime-action';

// const exportMethods = ['invoke', 'plugin', 'onError'];

export interface InvokerEntity {
  invoke<T = any, S = any>(ctrl: Controller, payload?: T): Promise<S>;
  plugin(plugin: ActionPlugin): void;
  onError(callback: ErrorCallback): void;
}
function createInvoker(): InvokerEntity {
  const _invoker = new Invoker(actionEngine);
  return {
    invoke<T, S>(ctrl: Controller<T, S>, payload?: T): Promise<S> {
      return _invoker.invoke<T, S>(ctrl, payload);
    },
    plugin(plugin: ActionPlugin) {
      return _invoker.plugin(plugin);
    },
    onError(callback: ErrorCallback) {
      return _invoker.onError(callback);
    },
  };
}

const invoker = createInvoker();
export default invoker;

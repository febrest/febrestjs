'use strict';

import { ActionPlugin, ErrorCallback } from 'invoker/Invoker';

import { Invoker } from 'invoker';
import actionEngine from './actionEngine';
import { Controller } from 'action/runtimeAction';

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

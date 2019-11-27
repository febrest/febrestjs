"use strict";

import { ActionEngine, ActionPlugin } from "invoker/Invoker";

import { Invoker } from "invoker";
import actionEngine from "./actionEngine";

const exportMethods = ["invoke", "plugin", "onError"];

export interface InvokerEntity {
  invoke: (
    ctrl: string | ((payload: any) => any),
    payload: any
  ) => Promise<any>;
  plugin: (plugin: ActionPlugin) => void;
  onError: (error: (error: any) => boolean) => void;
}
function createInvoker() {
  let _invoker = new Invoker(actionEngine);
  let invoker: InvokerEntity = {
    invoke: function(ctrl: string | ((payload: any) => any), payload: any) {
      return _invoker.invoke(ctrl, payload);
    },
    plugin: function(plugin: ActionPlugin) {
      return _invoker.plugin(plugin);
    },
    onError: function(error: (error: any) => boolean) {
      return _invoker.onError(error);
    }
  };
  return invoker;
}

const invoker = createInvoker();
export default invoker;

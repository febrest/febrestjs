"use strict";

import { postMessage as broadcast, subscribe, unsubscribe } from "./broadcast";
import state, { State } from "./state";

import { ActionPlugin } from "invoker/Invoker";
import { ActionRegister } from "action";
import { BroadcastEventListener } from "broadcast/Broadcast";
import { ObserverListener } from "observer/Observer";
import invoker from "./invoker";
import { observe } from "./observer";

const export_keys = {
  dispatch: true,
  subscribe: true,
  unsubscribe: true,
  State: true,
  plugin: true,
  action: true,
  broadcast: true,
  onError: true
};
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
}

const febrest: Febrest = {
  action: (namespace: string, actions: any) => {
    ActionRegister.registerAction(namespace, actions);
  },
  dispatch: invoker.invoke,
  plugin: invoker.plugin,
  onError: invoker.onError,
  subscribe,
  unsubscribe,
  broadcast,
  State: state,
  observe
};
export default febrest;

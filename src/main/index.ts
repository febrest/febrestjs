"use strict";

import { postMessage as broadcast, subscribe, unsubscribe } from "./broadcast";

import { ActionRegister } from "action";
import State from "./state";
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

export default {
  action: (namespace: string, actions: any) => {
    ActionRegister.registerAction(namespace, actions);
  },
  dispatch: invoker.invoke,
  plugin: invoker.plugin,
  onError: invoker.onError,
  subscribe,
  unsubscribe,
  broadcast,
  State,
  observe
};

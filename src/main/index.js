"use strict";

import {
  postMessage as bordercast,
  subscribe,
  unsubscribe
} from "./bordercast";

import { ActionRegister } from "./../action";
import invoker from "./invoker";
import State from './state'
import { observe } from './observer'
const export_keys = {
  dispatch: true,
  subscribe: true,
  unsubscribe: true,
  State: true, 
  plugin: true,
  action: true,
  bordercast: true,
  onError: true
};

export default {
  action: config => {
    ActionRegister.registerAction(config);
  },
  dispatch: invoker.invoke,
  plugin: invoker.plugin,
  onError: invoker.onError,
  subscribe,
  unsubscribe,
  bordercast,
  State,
  observe
};

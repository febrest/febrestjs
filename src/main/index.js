"use strict";

import {
  postMessage as bordercast,
  subscribe,
  unsubscribe
} from "./bordercast";

import { ActionRegister } from "./../action";
import invoker from "./invoker";

const export_keys = {
  dispatch: true,
  subscribe: true,
  unsubscribe: true,
  State: true,
  watch: true,
  unwatch: true,
  plugin: true,
  action: true
};

export default {
  action: config => {
    ActionRegister.register(config);
  },
  dispatch: invoker.invoke,
  plugin: invoker.plugin,
  onError: invoker.onError,
  subscribe,
  unsubscribe,
  bordercast
};

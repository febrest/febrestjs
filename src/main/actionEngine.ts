import {
  ACTION_READY_STATE,
  ActionRegister,
  clearRuntimeAction,
  createRuntimeAction,
  getRuntimeAction,
  setRuntimeAction
} from "action";

import { RuntimeAction } from "action/runtimeAction";
import { isPromise } from "utils";
import { makeError } from "error";

/********************** action执行流程**********************
 *                      initialize                        *
 *                          |                             *
 *                          |                             *
 *          +++++++++++++++++++++++++++++++++             *
 *          +               |               +             *
 *          +               |               +             *
 *          +              exec             +             *
 *          +               |               +             *
 *          +          ************         +             *
 *          +          * if error *         +             *
 *          +          ************         +             *
 *          +               |-yes-terminate-+---------    *
 *          +               no              +        |    *
 *          +               |               +        |    *
 *          +               |               +        |    *
 *          +               |               +        |    *
 *          +               |               +        |    *
 *          +++++++++++++++++++++++++++++++++        |    *
 *                          |                        |    *
 *                          |————————————————————————|    *
 *                        close                           *
 **********************************************************/

function initialize(ctrl: string | ((payload: any) => any), payload: any) {
  let name, controller;
  if (typeof ctrl === "function") {
    name = ctrl.name;
    controller = ctrl;
  } else {
    name = ctrl;
    controller = ActionRegister.getAction(name);
  }
  const action = createRuntimeAction(name, controller, payload);
  setRuntimeAction(action);
  action.stage = ACTION_READY_STATE.READY;
  return action;
}

function complete(action: RuntimeAction) {
  return action;
}
function exception(action: RuntimeAction, error: Error) {
  action.stage = ACTION_READY_STATE.EXCEPTION;
  clearRuntimeAction(action);
  action.error = error;
}

function exec(action: RuntimeAction) {
  let { controller, payload } = action;
  /*
   * 没有controller的时候抛出异常
   * todos: 这部分异常可能会移出
   */
  if (!controller) {
    return makeError("can't find the action of " + action);
  }
  let maybePromise = controller.call(null, payload);
  if (isPromise(maybePromise)) {
    return maybePromise.then(
      (state: any) => {
        action.stage = ACTION_READY_STATE.COMPLETE;
        action.result = state;
        return action;
      },
      (e: any) => {
        return Promise.reject(e);
      }
    );
  } else {
    action.stage = ACTION_READY_STATE.COMPLETE;
    action.result = maybePromise;
    return Promise.resolve(action);
  }
}

function close(action: RuntimeAction) {
  action.stage = ACTION_READY_STATE.CLOSE;
  clearRuntimeAction(action);
}

export default {
  initialize,
  exec,
  complete,
  close,
  exception
};

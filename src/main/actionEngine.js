import {
  ACTION_READY_STATE,
  ActionRegister,
  clearRuntimeAction,
  createRuntimeAction,
  getRuntimeAction,
  setRuntimeAction
} from "../action";

import { isPromise } from "../util";
import { makeError } from "./../error";

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

function initialize(ctrl, payload) {
  let name;
  if (typeof ctrl === "function") {
    name = ctrl.name;
  } else {
    name = ctrl;
    ctrl = ActionRegister.getAction(name);
  }
  let action = createRuntimeAction(name, ctrl, payload);
  setRuntimeAction(action);
  action.stage = ACTION_READY_STATE.READY;
  return action;
}

function complete(action, state) {
  return action;
}
function exception(action, error) {
  action.stage = ACTION_READY_STATE.EXCEPTION;
  clearRuntimeAction(action);
  action.error = error;
}

function exec(action) {
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
      state => {
        action.stage = ACTION_READY_STATE.COMPLETE;
        action.result = state;
        return action;
      },
      e => {
        return Promise.reject(e);
      }
    );
  } else {
    action.stage = ACTION_READY_STATE.COMPLETE;
    action.result = maybePromise;
    return Promise.resolve(action);
  }
}

function close(action) {
  action.stage = ACTION_READY_STATE.CLOSE;
  let runtimeAction = getRuntimeAction();
  if (runtimeAction === action) {
    setRuntimeAction(null);
  }
}

export default {
  initialize,
  exec,
  complete,
  close,
  exception
};

import {
  ACTION_READY_STATE,
  clearRuntimeAction,
  createRuntimeAction,
  getRuntimeAction,
  setRuntimeAction,
} from 'action';

import { RuntimeAction, Controller } from 'action/runtimeAction';
import { isPromise } from 'utils';
import { makeError } from 'error';
import { ActionEngine } from 'invoker/Invoker';

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

function initialize<T, S>(
  ctrl: Controller<T, S>,
  payload: T
): RuntimeAction<T, S> {
  const action = createRuntimeAction<T, S>(ctrl, payload);
  setRuntimeAction(action);
  action.stage = ACTION_READY_STATE.READY;
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
        action.stage = ACTION_READY_STATE.COMPLETE;
        action.result = e;
        return Promise.reject(action);
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

const actionEngine: ActionEngine = {
  initialize,
  exec,
  close,
  exception,
};
export default actionEngine;

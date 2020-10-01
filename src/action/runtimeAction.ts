import ACTION_READY_STATE from './ACTION_READY_STATE';
let RUNTIME_ACTION: RuntimeAction | undefined;

export type Controller<T = any, S = any> = (payload?: T) => S;
export interface RuntimeAction<T = any, S = any> {
  $typeof$: 'RuntimeAction';
  stage: string;
  controller?: Controller<T, S>;
  payload?: T;
  result?: S;
  error?: Error;
}
function setRuntimeAction(action: RuntimeAction) {
  RUNTIME_ACTION = action;
}
function getRuntimeAction(): RuntimeAction | undefined {
  return RUNTIME_ACTION;
}

function createRuntimeAction<T = any, S = any>(
  controller: Controller<T, S>,
  payload: T
) {
  const runtimeAction: RuntimeAction<T, S> = {
    $typeof$: 'RuntimeAction',
    stage: ACTION_READY_STATE.UNINITIALIZED,
    controller,
    payload,
    result: undefined,
    error: undefined,
  };
  return runtimeAction;
}

function clearRuntimeAction(runtimeAction: RuntimeAction) {
  runtimeAction.controller = undefined;
  runtimeAction.payload = undefined;
  runtimeAction.result = undefined;
  if (RUNTIME_ACTION === runtimeAction) {
    RUNTIME_ACTION = undefined;
  }
}

export {
  setRuntimeAction,
  getRuntimeAction,
  createRuntimeAction,
  clearRuntimeAction,
};

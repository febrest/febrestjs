import ACTION_READY_STATE from "./ACTION_READY_STATE";
let RUNTIME_ACTION: RuntimeAction | undefined;
export interface RuntimeAction {
  $typeof$: "RuntimeAction";
  stage: string;
  name: string;
  controller: ((payload: any) => void) | undefined;
  payload: any;
  result: any;
  error: Error;
}
function setRuntimeAction(action: RuntimeAction) {
  RUNTIME_ACTION = action;
}
function getRuntimeAction() {
  return RUNTIME_ACTION;
}

function createRuntimeAction(
  name: string,
  controller: (payload: any) => void,
  payload: any
) {
  let runtimeAction = {
    $typeof$: "RuntimeAction",
    stage: ACTION_READY_STATE.UNINITIALIZED,
    name,
    controller,
    payload,
    result: undefined,
    error: undefined
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
  clearRuntimeAction
};

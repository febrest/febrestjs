import ACTION_READY_STATE from './ACTION_READY_STATE';
let RUNTIME_ACTION;

function setRuntimeAction(action) {
    RUNTIME_ACTION = action;
}
function getRuntimeAction() {
    return RUNTIME_ACTION;
}

function createRuntimeAction(name, action, payload) {
    let runtimeAction = {
        $typeof$: 'RuntimeAction',
        stage: ACTION_READY_STATE.UNINITIALIZED,
        name,
        action,
        payload,
        result: undefined,
        error: undefined
    }
    return runtimeAction;
}

function clearRuntimeAction(runtimeAction) {
    runtimeAction.action = undefined;
    runtimeAction.payload = undefined;
    runtimeAction.result = undefined;
    if (RUNTIME_ACTION === action) {
        RUNTIME_ACTION = null;
    }
}

export {
    setRuntimeAction,
    getRuntimeAction,
    createRuntimeAction,
    clearRuntimeAction
}
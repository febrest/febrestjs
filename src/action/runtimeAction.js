import { paramsForFunction } from './../util';
import ACTION_READY_STATE from './ACTION_READY_STATE';
let runtimeAction;

function setRuntimeAction(action) {
    runtimeAction = action;
}
function getRuntimeAction() {
    return runtimeAction;
}

function createRuntimeAction(name,controller, payload) {
    let params = paramsForFunction(controller);
    let action = {
        $typeof$: 'RuntimeAction',
        stage: ACTION_READY_STATE.UNINITIALIZED,
        name,
        controller,
        payload,
        params,
        resolvedParams: undefined,
        result: undefined,
        error: undefined
    }
    return action;
}

function clearRuntimeAction(action) {
    action.controller = undefined;
    action.payload = undefined;
    action.result = undefined;
    action.resolvedParams = undefined;
    if(runtimeAction === action){
        runtimeAction = null;
    }
}

export {
    setRuntimeAction,
    getRuntimeAction,
    createRuntimeAction,
    clearRuntimeAction
}
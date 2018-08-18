import getAction from './getAction';
import { paramsForFunction } from './../util';
import resolveParams from './resolveParams'
import ACTION_READY_STATE from './ACTION_READY_STATE';
let runtimeAction;
let id = 0;

function IDGenerator() {
    return ++id;
}


function setRuntimeAction(action) {
    runtimeAction = action;
}
function getRuntimeAction() {
    return runtimeAction;
}

function createRuntimeAction(key, payload) {
    let staticAction = getAction(key);
    let {
        controller
    } = staticAction;
    let params = paramsForFunction(controller);
    let action = {
        $typeof$: 'RuntimeAction',
        id: IDGenerator(),
        key,
        controller,
        payload,
        result: undefined,
        error: undefined,
        params,
        resolvedParams: resolveParams(params),
        stage: ACTION_READY_STATE.UNINITIALIZED
    }
    return action;
}

function clearRuntimeAction(action) {
    action.controller = undefined;
    action.payload = undefined;
    action.result = undefined;
    action.resolvedParams = undefined;
}

export {
    setRuntimeAction,
    getRuntimeAction,
    createRuntimeAction,
    clearRuntimeAction
}
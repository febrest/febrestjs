import createActions from './createActions';
import {catchIt} from './../error';
import * as observer from './../observer';
import constants from './../constants';
import {provide} from './../util/provide';
import {setRuntimeAction,createRuntimeAction} from './runtimeAction';

import ACTION_READY_STATE from './ACTION_READY_STATE';
import { then } from './../util';



function assembleResult(action, state) {

    let result = {
        state,
        key:action.key,
        id:action.id
    }
    action.result = result;

    return action;
}

function pushToObserver(action) {
    observer.next(action.result);
}


function applyMiddleWare(middleWare) {
    run = middleWare(run);
}

function actionPrepare(key, payload) {
    let action = createRuntimeAction(key,payload);
    action.readyState = ACTION_READY_STATE.UNINITIALIZED;
    setRuntimeAction(action);
    action.exec = actionExec;
    action.terminate = actionTerminate;
    return action;
}
function actionBegin(action) {

    let {
        controller,
        payload
    } = action;
    action.readyState = ACTION_READY_STATE.RUNNING;
    return provide(controller, action).then(
        args => {
            action.args = args;
            return action;
        }
    );
    
}
function actionComplete(action) {
    action.readyState = ACTION_READY_STATE.COMPLETE;
    pushToObserver(action);

}
function actionTerminate(action){
    action = action || this;
    action.readyState = ACTION_READY_STATE.TERMINATE;
    action.result = null;
    action.exec = null;
    action.deps = null;
    action.args = null;
}
/**
 * 
 * @param {any} controller 
 * @param {any} args
 */
function actionExec(action) {
    return run(action).then(
        actionComplete
    )

    
}

function controllerExec(action) {
    let {
        controller,
        args
    } = action;
    
    let state = controller.apply(null, args);

    return then(state).then(
        (state)=>assembleResult(action,state)
    );
}
function exec(key, payload) {

    let action;
    try{
        action = actionPrepare(key, payload);
        actionBegin(action).then(
            actionExec
        ).catch(catchIt);
    }catch(e){
        actionTerminate(action);
        catchIt(e);
    }
    
    return action.id;
}

/**
 * stub
 */
let run = controllerExec;

export {
    createActions,
    exec,
    applyMiddleWare,
    ACTION_READY_STATE,
};
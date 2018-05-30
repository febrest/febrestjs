import createActions from './createActions';
import {catchIt} from './../error';
import * as observer from './../observer';
import constants from './../constants';
import {provide} from './../util/provide';
import {setRuntimeAction,createRuntimeAction} from './runtimeAction';

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
    setRuntimeAction(action);
    action.exec = actionExec;
    return action;
}
function actionBegin(action) {

    let {
        controller,
        payload
    } = action;
    return provide(controller, action).then(
        args => {
            action.args = args;
            return action;
        }
    );
}
function actionComplete(action) {

    pushToObserver(action);

}
/**
 * 
 * @param {any} controller 
 * @param {any} args
 */
function actionExec(action) {
    try{
        return run(action).then(
            actionComplete
        ).catch(catchIt);
    }catch(e){
        catchIt(e);
    }

    
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
    }catch(e){
        catchIt(e);
    }
    actionBegin(action).then(
        actionExec
    )
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
};
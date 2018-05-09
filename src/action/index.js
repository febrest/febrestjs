import createActions from './createActions';
import getAction from './getAction';
import error from './../error';
import * as observer from './../observer';
import constants from './../constants';
import provide from './../util/provide';

import { isArray, getArgumentList, then } from './../util';


let errorHandle = error.handle;

let id = 0;



function IDGenerator() {
    return ++id;
}



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

    let action = getAction(key);
    let id = IDGenerator();

    action.id = id;

    action.payload = payload;

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

    return run(action).then(
        actionComplete
    ).catch(
        errorHandle
    );
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

    let action = actionPrepare(key, payload);
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
    getAction,
    exec,
    applyMiddleWare,
};
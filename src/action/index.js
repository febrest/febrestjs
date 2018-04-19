import createActions from './createActions';
import getAction from './getAction';
import error from './../error';
import * as observer from './../observer';
import constants from './../constants';
import { ProviderContainer } from './../provider';
import { getService } from './../services';
import { isArray, getArgumentList, then } from './../util';


let errorHandle = error.handle;

let id = 0;

const $FEBREST_ARGSLIST$ = '$FEBREST_ARGSLIST$';

const { getProvider } = ProviderContainer;



function IDGenerator() {
    return ++id;
}

function providerGetState(provider, action) {
    return provide(provider.getState, action).then(args => {
        return provider.getState.apply(provider, args);
    });
}

/**
* todos:需要优化
*/
function dependencyLookup(list, action) {
    var isPayloadUsed = false;
    var args = [];
    if (list) {
        args = list.map(arg => {
            let provider = getProvider(arg);
            if (provider) {
                return then(providerGetState(provider, action));
            } else if (arg[0] === '$') {
                return then(getService(arg, action));
            } else {
                //找不到依赖 抛出异常
                throw new Error('不存在名为' + arg + '的依赖');
            }
        });
    }
    return Promise.all(args);

}
function _arguments(func) {
    let args = func[$FEBREST_ARGSLIST$];
    //获取arglist 这一步添加缓存，提高运行效率
    if (!args) {
        args = getArgumentList(func);
        func[$FEBREST_ARGSLIST$] = args;
    }
    return args;
}

function provide(func, action) {
    let args = _arguments(func);
    return dependencyLookup(args, action);
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
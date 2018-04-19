import createActions from './createActions';
import getAction from './getAction';
import runAction from './runAction';
import innerActions from './innerActions';
import error from './../error';
import provider from './../provider';
import observer from './../observer';
import constants from './../constants';


var errorHandle = error.handle;

var run = function (action, payload,id) {
    return provider.provide(action, payload)
        .then(args => runAction(action.controller, args))
        .then(state => setResult(state, action.key,id))
}

var id = 0;

function IDGenerator() {
    return ++id;
}

function providerPersist(persist, state) {
    if (persist) {
        exec(constants.PROVIDER_PERSIST_ACTION, { persist: persist, state });
    }
    return state;
}

function setResult(state, key,id) {
    let result = {
        state,
        key,
        id
    }
    return result;
}

function pushToObserver(result) {
    observer.next(result);
    return result;
}
function exec(key, payload) {
    var action = getAction(key);
    var id = IDGenerator();

    //捕获所有异常
    run(action, payload,id)
        .then(result => pushToObserver(result))
        .then((result) => providerPersist(action.persist, result.state))
        .catch(e => errorHandle(e))

    return id;
}

function applyMiddleWare(middleWare) {
    run = middleWare(run);
}


var exports = {
    createActions,
    getAction,
    exec: exec,
    applyMiddleWare,
}
createActions(innerActions.actions);


export default exports;
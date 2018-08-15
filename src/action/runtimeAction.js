import getAction from './getAction';
import {paramsForFunction} from './../util';
import findDeps from './findDeps'
let runtimeAction;
let id = 0;

function IDGenerator() {
    return ++id;
}


function setRuntimeAction(action){
    runtimeAction = action;
}
function getRuntimeAction(){
    return runtimeAction;
}

function createRuntimeAction(key,payload){
    let staticAction = getAction(key);
    let {
        controller
    } = staticAction;
    let params = paramsForFunction(controller);
    let action = {
        $typeof$:'RuntimeAction',
        id:IDGenerator(),
        key,
        controller,
        payload,
        result:undefined,
        readyState:'',
        error:undefined,
        params,
        deps:{},
        stage:undefined
    } 
    return action;

}

export {
    setRuntimeAction,
    getRuntimeAction,
    createRuntimeAction
}
import getAction from './getAction';


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
    let action = {
        $typeof$:'RuntimeAction',
        id:IDGenerator(),
        key:staticAction.key,
        controller:staticAction.controller,
        payload,
        result:undefined,
        readyState:'',
        error:undefined,
        args:[],
        provider:{},
        deps:{}
    } 
    return action;

}

export {
    setRuntimeAction,
    getRuntimeAction,
    createRuntimeAction
}
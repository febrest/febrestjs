import {catchIt} from './../error';
import {provide} from './../util/provide';
import {setRuntimeAction,createRuntimeAction} from './runtimeAction';

import ACTION_READY_STATE from './ACTION_READY_STATE';


/********************** action执行流程**********************
 *                      initialize                        *
 *                          |                             *
 *                          |                             *
 *          +++++++++++++++++++++++++++++++++             *
 *          +               |               +             *
 *          +               |               +             *
 *          +              exec             +             *
 *          +               |               +             *
 *          +          ************         +             *
 *          +          * if error *         +             *
 *          +          ************         +             *
 *          +               |-yes-terminate-+---------    *
 *          +               no              +        |    *
 *          +               |               +        |    *
 *          +             finish            +        |    *
 *          +               |               +        |    *
 *          +               |               +        |    *
 *          +++++++++++++++++++++++++++++++++        |    * 
 *                          |                        |    *
 *                          |————————————————————————|    *
 *                        close                           *
 **********************************************************/      
            
function assembleResult(action, state) {

    let result = {
        state,
        key:action.key,
        id:action.id
    }
    action.result = result;

    return action;
}


function initialize(key, payload) {
    let action = createRuntimeAction(key,payload);
    action.readyState = ACTION_READY_STATE.UNINITIALIZED;
    setRuntimeAction(action);
}

function complete(action) {
    action.readyState = ACTION_READY_STATE.COMPLETE;

}
function terminate(action,error){
    action.readyState = ACTION_READY_STATE.TERMINATE;
    action.result = null;
    action.exec = null;
    action.deps = null;
    action.args = null;
    action.error = error;
}

function exec(action) {
    let {
        controller,
        args
    } = action;
    let state = controller.apply(null, args);
    return state;
}

export {
    initialize,
    exec,
    terminate,
    complete
    
};
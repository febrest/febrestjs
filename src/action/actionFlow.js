import { setRuntimeAction, createRuntimeAction, clearRuntimeAction } from './runtimeAction';
import ACTION_READY_STATE from './ACTION_READY_STATE';
import { isPromise } from './../util'


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
 *          +             complete          +        |    *
 *          +               |               +        |    *
 *          +               |               +        |    *
 *          +++++++++++++++++++++++++++++++++        |    * 
 *                          |                        |    *
 *                          |————————————————————————|    *
 *                        close                           *
 **********************************************************/

function assembleResult(action, state) {
    return {
        state,
        name: action.name,
        id: action.id
    }
}


function initialize(name, controller, payload) {
    let action = createRuntimeAction(name, controller, payload);
    setRuntimeAction(action);
    action.stage = ACTION_READY_STATE.READY;
    return action;
}

function complete(action, state) {
    action.stage = ACTION_READY_STATE.COMPLETE;
    action.result = assembleResult(action, state);
    return action;
}
function exception(action, error) {
    action.stage = ACTION_READY_STATE.EXCEPTION;
    clearRuntimeAction(action);
    action.error = error;
}

function exec(action) {
    let {
        controller,
        resolvedParams
    } = action;
    let maybePromise = controller.apply(null, resolvedParams);
    if (isPromise(maybePromise)) {
        return maybePromise.then(
            (state) => {
                setRuntimeAction(action);
                return complete(action, state);
            }
        );
    } else {
        return Promise.resolve(complete(action, maybePromise));
    }
}

function close(action) {
    action.stage = ACTION_READY_STATE.CLOSE;
}

export {
    initialize,
    exec,
    complete,
    close,
    exception
};
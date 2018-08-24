import { ACTION_READY_STATE, setRuntimeAction, createRuntimeAction, clearRuntimeAction } from '../action';
import { isPromise } from '../util'
import resolveParams from './resolveParams';


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
 *          +               |               +        |    *
 *          +               |               +        |    *
 *          +               |               +        |    *
 *          +++++++++++++++++++++++++++++++++        |    * 
 *                          |                        |    *
 *                          |————————————————————————|    *
 *                        close                           *
 **********************************************************/

function initialize(name, controller, payload) {
    let action = createRuntimeAction(name, controller, payload);
    setRuntimeAction(action);
    action.stage = ACTION_READY_STATE.READY;
    return action;
}

function complete(action, state) {

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
        params
    } = action;
    action.resolvedParams = resolveParams(params);
    let maybePromise = controller.apply(null, resolvedParams);
    if (isPromise(maybePromise)) {
        return maybePromise.then(
            (state) => {
                action.stage = ACTION_READY_STATE.COMPLETE;
                action.result = state;
                return action;
            }
        );
    } else {
        action.stage = ACTION_READY_STATE.COMPLETE;
        action.result = maybePromise;
        return Promise.resolve(action);
    }
}

function close(action) {
    action.stage = ACTION_READY_STATE.CLOSE;
    let runtimeAction = getRuntimeAction();
    if (runtimeAction === action) {
        setRuntimeAction(null);
    }
}

export default {
    initialize,
    exec,
    complete,
    close,
    exception
};
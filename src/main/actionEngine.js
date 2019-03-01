import { ACTION_READY_STATE, setRuntimeAction, createRuntimeAction, clearRuntimeAction, getRuntimeAction } from '../action';
import { isPromise } from '../util'
import resolveParams from './resolveParams';
import register from './register';


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

function initialize(name, payload) {
    let action = createRuntimeAction(name, register.getAction(name).controller, payload);
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
        payload
    } = action;
    let maybePromise = controller.call(null, payload);
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
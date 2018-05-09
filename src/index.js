import { applyMiddleWare, createActions } from './action';
import { dispatch } from './dispatcher';
import error from './error';
import {Provider,inject,use} from './provider';
import {subscribe,unsubscribe,watch,removeWatcher} from './observer';


var version;

try {

    version = VERSION;
} catch (e) {

}
export default {
    /**
     * @description
     * exports dispatch
     */
    dispatch,

    /**
     * @description
     * exports action
     */
    createActions,
    applyMiddleWare,

    /**
     * @description
     * exports provider
    */
    Provider,
    injectProvider: inject,
    useProvider: use,
    /**
     * @description
     * exports observer
    */
    subscribe,
    unsubscribe,
    watch,
    removeWatcher,
    
    onError: error.onError,

    version
}
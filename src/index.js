import {createActions } from './action';
import { dispatch,subscribe,unsubscribe,watch,removeWatcher } from './dispatcher';
import {onError} from './error';
import {Provider,inject as injectProvider,use as useProvider} from './provider';
import {inject as injectService} from './services';


let version;

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

    /**
     * @description
     * exports provider
    */
    Provider,
    injectProvider,
    useProvider,
    injectService,
    /**
     * @description
     * exports observer
    */
    subscribe,
    unsubscribe,
    watch,
    removeWatcher,
    
    onError,

    version
}
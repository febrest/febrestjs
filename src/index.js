import action from './action';
import dispatcher from './dispatcher';
import error from './error';
import provider from './provider';
import observer from './observer';
import constants from './constants';


var {
    dispatch
} = dispatcher;

var {
    applyMiddleWare,
    createActions,
} = action;

var {
    PROVIDER_PERSIST_ACTION
} = constants;
var {
    Provider,
    StorageProvider,
    RemoteProvider,
    SessionProvider,
    inject,
    use,
    watch
} = provider;

var {
    subscribe,
    unsubscribe,
} = observer;
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
    StorageProvider,
    RemoteProvider,
    SessionProvider,
    injectProvider: inject,
    useProvider: use,

    /**
     * @description
     * exports observer
    */
    subscribe,
    unsubscribe,
    watch,
    onError: error.onError,

    /**
     * @constants
    */
    PROVIDER_PERSIST_ACTION
}
import action from './action';
import dispatcher from './dispatcher';
import error from './error';
import provider from './provider';
import Observer from './observer';


var {
    dispatch
} = dispatcher;

var {
    applyMiddleWare,
    createActions,
    PROVIDER_PERSIST_ACTION
} = action;

var {
    Provider,
    StorageProvider,
    RemoteProvider,
    SessionProvider,
    inject,
    use
} = provider;


export default{
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
     * 
    */
    subscribe: function (callback) {
        return Observer.subscribe(callback);
    },
    unsubscribe: function (callback) {
        return Observer.unsubscribe(callback);
    },
    onError: error.onError,

    /**
     * @constants
    */
    PROVIDER_PERSIST_ACTION
}
import action from './action';
import Dispatcher from './dispatcher';
import error from './error';
import provider from './provider';
import Observer from './observer';

var applyMiddleWare = action.applyMiddleWare;
var {
    Provider,
    StorageProvider,
    RemoteProvider,
    SessionProvider,
    inject,
    use
} = provider;


module.exports =  {
    dispath:Dispatcher.dispatch,
    createActions:action.createActions,
    applyMiddleWare,

    /**
     * @description
     * exports provider
    */
    Provider,
    StorageProvider,
    RemoteProvider,
    SessionProvider,
    injectProvider:inject,
    useProvider:use,

    /**
     * 
    */
    subscribe:function(callback){
        return Observer.subscribe(callback);
    },
    unsubscribe:function(callback){
        return Observer.unsubscribe(callback);
    },
    onError:error.onError,

    /**
     * @constants
    */
    PROVIDER_PERSIST_ACTION:action.PROVIDER_PERSIST_ACTION,


}
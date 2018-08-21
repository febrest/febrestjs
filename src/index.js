import { createActions } from './action';
import { dispatch, subscribe, unsubscribe, watch, removeWatcher } from './dispatcher';
import { onError } from './error';
import { Provider } from './provider';
import * as services from './services';

import {
    ProviderRegister,
    StateRegister,
    ServicesRegister
} from './register'


let version;

try {
    version = VERSION;
} catch (e) {

}

function registerService(name, service) {
    ServicesRegister.register({ name, service });
}

function registerProvider(configs) {
    ProviderRegister.register(configs);
}
function registerState(configs) {
    StateRegister.register(configs);
}

for (let s in services) {
    registerService(s, services[s]);
}

export default {
    /**
     * @description
     * exports dispatch
     */
    dispatch,
    subscribe,
    unsubscribe,
    watch,
    removeWatcher,

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
    
    onError,

    registerService,
    registerProvider,
    registerState,

    version
}
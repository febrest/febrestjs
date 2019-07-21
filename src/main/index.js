'use strict'
import invoker from './invoker';
import { subscribe, unsubscribe, postMessage as bordercast } from './bordercast';
import { Provider } from './../provider'
import { ActionRegister } from './../action';
const export_keys = {
    'query': true,
    'update': true,
    'dispatch': true,
    'subscribe': true,
    'unsubscribe': true,
    'plugin': true
}




export default {
    action: (config) => { ActionRegister.register(config) },
    dispatch: invoker.invoke,
    plugin: invoker.plugin,
    onError: invoker.onError,
    subscribe,
    unsubscribe,
    bordercast,
    Provider
}
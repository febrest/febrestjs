'use strict'
import invoker from './invoker';
import { subscribe, unsubscribe, postMessage as bordercast } from './bordercast';
import { Provider } from './../provider'
const export_keys = {
    'query': true,
    'update': true,
    'dispatch': true,
    'subscribe': true,
    'unsubscribe': true,
    'plugin': true
}




export default {
    dispatch: invoker.invoke,
    plugin: invoker.plugin,
    onError: invoker.onError,
    subscribe,
    unsubscribe,
    bordercast,
    Provider
}
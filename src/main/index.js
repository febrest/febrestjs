'use strict'
import register from './register';
import invoker from './invoker';
import { update } from './update';
import { query } from './query';
import { watch, unwatch } from './observer'
import { subscribe, unsubscribe } from './bordercast';
// import * as services from './services'

import { Provider } from './../provider'
const export_keys = {
    'registerAction': true,
    'registerProvider': true,
    // 'registerState': true,
    // 'registerService': true,
    'query': true,
    'update': true,
    'dispatch': true,
    'subscribe': true,
    'unsubscribe': true,
    'watch': true,
    'unwatch': true,
    'plugin': true
}

const {
    registerAction,
    registerProvider,
    // registerService,
    // registerState
} = register;

// for (let s in services) {
//     let service = services[s];
//     registerService(service.name, service);
// }

export default {
    registerAction,
    registerProvider,
    // registerService,
    // registerState,
    query,
    update,
    dispatch: dispatcher.dispatch,
    plugin: dispatcher.plugin,
    onError: dispatcher.onError,
    subscribe,
    unsubscribe,
    watch,
    unwatch,
    Provider
}
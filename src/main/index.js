'use strict'
import register from './register';
import dispatcher from './dispatcher';
import updater from './updater';
import fetcher from './fetcher';
import { watch, unwatch } from './observer'
import { subscribe, unsubscribe } from './bordercast';
import * as services from './services'

const export_keys = {
    'registerAction': true,
    'registerProvider': true,
    'registerState': true,
    'registerService': true,
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
    registerService,
    registerState
} = register;

for (let s of services) {
    registerService(s.name, s);
}

export default {
    registerAction,
    registerProvider,
    registerService,
    registerState,
    query: fetcher.query,
    update: updater.update,
    dispatch: dispatcher.dispatch,
    plugin: dispatcher.plugin,
    onError: dispatcher.onError,
    subscribe,
    unsubscribe,
    watch,
    unwatch
}
'use strict'
import register from './register';
import dispatcher from './dispatcher';
import updater from './updater';
import fetcher from './fetcher';
import {watch,unwatch} from './observer'


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

export default {
    registerAction: register.registerAction,
    registerProvider: register.registerProvider,
    registerService: register.registerService,
    registerState: register.registerState,
    query: fetcher.query,
    update: updater.update,
    dispatch: dispatcher.dispatch,
    subscribe: dispatcher.subscribe,
    unsubscribe: dispatcher.unsubscribe,
    watch: dispatcher.watch,
    plugin: dispatcher.plugin,
    watch,
    unwatch
}
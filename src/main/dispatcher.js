'use strict'
import { Dispatcher } from './../dispatcher';
import { catchIt } from './../error';
import { immediate } from './../util';
import {
    initialize,
    exec,
    exception,
    close,
    setRuntimeAction
} from './../action';
import resolveParams from './resolveParams';
import register from './register';
const exportMethods = ['dispatch', 'subscribe', 'unsubscribe', 'watch', 'unwatch', 'plugin'];


class MainDispatcher extends Dispatcher {
    dispatch(name, payload) {
        let {
            controller
        } = register.getAction(name);
        let action = initialize(name, controller, payload);
        let id = action.id;
        this.pendingAction(action);
        return id;
    }
    pendingAction(action) {
        immediate(() => {
            setRuntimeAction(action);
            try {
                action.resolvedParams = resolveParams(action.params);
                this.applyPlugin('initialized', action);
                let promise = exec(action);
                promise.then(() => {
                    this.bordercast.message(action.result);
                    this.applyPlugin('close', action);
                    close(action);
                }).catch(e => {
                    exception(action, e);
                    catchIt(e);
                    this.applyPlugin('close', action);
                    close(action);
                });
            } catch (e) {
                exception(action, e);
                catchIt(e);
                this.applyPlugin('close', action);
                close(action);
            } finally {
                
            }

        });
    }
}


function createDispatcher(isPublic) {
    let _dispatcher = new MainDispatcher(isPublic);
    let dispatcher = {};
    exportMethods.forEach(method => {
        dispatcher[method] = function (...args) {
            return _dispatcher[method].apply(_dispatcher, args);
        }
    });
    return dispatcher;
}

let dispatcher = createDispatcher(true);
export default dispatcher;
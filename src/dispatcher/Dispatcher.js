'use strict'

import { Observer, Bordercast } from './../observer';
import { AsyncHook } from './../hook';
import { immediate } from './../util';

let ID = 0;

function IDGenerator() {
    return ++ID;
}
function sysErrorHandler(error) {
    console.error(error);
}
/**
 * @description
 * 公共的dispatcher dispatch出来的action会被所有的dispatcher接收
 * 私有的dispatcher能接收所有的action，但是dispatch出去的action不会被其他dispatcher接收？
 */
class Dispatcher {
    constructor(isPublic, engine) {
        this.observer = new Observer();
        this.bordercast = new Bordercast(isPublic);
        this.hook = new AsyncHook();
        this.engine = engine;
        this.error;
    }
    dispatch(name: string, payload: any) {
        let id = IDGenerator();
        let runtimeAction = this.engine.initialize(name, payload);
        this.pendingAction(runtimeAction, id);
        return id;
    }
    pendingAction(runtimeAction, id) {
        immediate(() => {
            this.hook.apply(
                'initialized',
                runtimeAction,
                (runtimeAction) => {
                    try {
                        let promise = this.engine.exec(runtimeAction);
                        promise.then(() => {
                            this.bordercast.message(
                                {
                                    state: runtimeAction.result,
                                    id,
                                    name: runtimeAction.name
                                }
                            );
                            this.hook.apply('close', runtimeAction, runtimeAction => {
                                this.engine.close(runtimeAction);
                            });
                        }).catch(e => {
                            this.engine.exception(runtimeAction, e);
                            this.catchError(e);
                            this.hook.apply('close', runtimeAction, runtimeAction => {
                                this.engine.close(runtimeAction);
                            });
                        });
                    } catch (e) {
                        this.engine.exception(runtimeAction, e);
                        this.catchError(e);
                        this.hook.apply('close', runtimeAction, runtimeAction => {
                            this.engine.close(runtimeAction);
                        });
                    } finally {

                    }
                }
            );
        })
    }
    release() {
        this.bordercast.release();
        this.observer.release();
    }
    subscribe(callback) {
        this.bordercast.subscribe(callback);
    }
    unsubcribe(callback) {
        this.bordercast.unsubscribe(callback)
    }
    watch(callback) {
        this.observer.watch(callback);
    }
    unwatch(callback) {
        this.observer.removeWatcher(callback)
    }
    plugin(plugin) {
        this.hook.plugin(plugin);
    }
    onError(callback) {
        this.error = callback;
    }
    catchError(error) {
        if (!this.error || !this.error(error)) {
            sysErrorHandler(error);
        }
    }
}
export default Dispatcher;
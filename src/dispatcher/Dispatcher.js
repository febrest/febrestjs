'use strict'

import { Observer, Bordercast } from './../observer';
import { AsyncHook } from './../hook';
import { immediate } from './../util';

function sysErrorHandler(error) {
    console.error(error);
}
/**
 * @description
 * dispatcher不再触发任何广播，广播只有手动调用Broadcast服务去触发
 */
class Dispatcher {
    constructor(engine) {
        this.hook = new AsyncHook();
        this.engine = engine;
        this.error;
    }
    dispatch(name: string, payload: any) {
        let runtimeAction = this.engine.initialize(name, payload);
        return this.pendingAction(runtimeAction);
    }
    pendingAction(runtimeAction) {
        return new Promise((resolve,reject) => {
            this.hook.apply(
                'initialized',
                runtimeAction,
                (runtimeAction) => {
                    try {
                        let promise = this.engine.exec(runtimeAction);
                        promise.then(() => {
                            resolve(
                                {
                                    state: runtimeAction.result,
                                    name: runtimeAction.name
                                }
                            );
                            this.hook.apply('close', runtimeAction, runtimeAction => {
                                this.engine.close(runtimeAction);
                            });
                        }).catch(e => {
                            reject(e);
                            this.engine.exception(runtimeAction, e);
                            this.catchError(e);
                            this.hook.apply('close', runtimeAction, runtimeAction => {
                                this.engine.close(runtimeAction);
                            });
                        });
                    } catch (e) {
                        reject(e);
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
        this.hook.plugins = [];
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
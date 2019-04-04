'use strict'

import { AsyncHook } from '../hook';

function sysErrorHandler(error) {
    console.error(error);
}
/**
 * @description
 * Invoker
 * 负责调用controller
 * 不触发任何广播，广播只有手动调用Broadcast服务去触发
 */
class Invoker {
    constructor(engine) {
        this.hook = new AsyncHook();
        this.engine = engine;
        this.error;
    }
    //todos:异步或者同步由controller决定，直接返回controller的返回值
    //好像做不到，因为有中间件
    invoke(name: string, payload: any) {
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
                                runtimeAction.result
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
export default Invoker;
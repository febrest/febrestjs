'use strict';

import { ACTION_READY_STATE } from 'action/index';
import { AsyncHook } from 'hook';
import { HookPlugin } from 'hook/Hook';
import { RuntimeAction, Controller } from 'action/runtimeAction';

function sysErrorHandler(error: Error) {
  console.error(error.message);
}
/**
 * @description
 * Invoker
 * 负责调用controller
 * 不触发任何广播，广播只有手动调用Broadcast服务去触发
 */
export interface ActionEngine {
  initialize<T, S>(action: Controller<T, S>, payload?: T): RuntimeAction<T, S>;
  exec<T, S>(action: RuntimeAction<T, S>): Promise<RuntimeAction<T, S>>;
  close: (action: RuntimeAction) => any;
  exception: (action: RuntimeAction, e?: any) => any;
}
export interface ActionPlugin extends HookPlugin {
  initialized<T = any, S = any>(
    action: RuntimeAction<T, S>
  ): RuntimeAction<T, S> | Promise<RuntimeAction<T, S>>;
  exception<T = any, S = any>(
    data: RuntimeAction<T, S>
  ): RuntimeAction<T, S> | Promise<RuntimeAction<T, S>>;
  close<T = any, S = any>(
    data: RuntimeAction<T, S>
  ): RuntimeAction<T, S> | Promise<RuntimeAction<T, S>>;
}

export type ErrorCallback = (error: Error) => boolean;
class Invoker {
  private hook: AsyncHook = new AsyncHook();
  private engine: ActionEngine;
  private error?: ErrorCallback;
  constructor(engine: ActionEngine) {
    this.engine = engine;
  }
  //todos:异步或者同步由controller决定，直接返回controller的返回值
  //好像做不到，因为有中间件
  invoke<T = any, S = any>(action: Controller<T, S>, payload?: T): Promise<S> {
    const runtimeAction: RuntimeAction<T, S> = this.engine.initialize(
      action,
      payload
    );
    return this.pendingAction(runtimeAction);
  }
  private pendingAction<T = any, S = any>(
    runtimeAction: RuntimeAction<T, S>
  ): Promise<S> {
    return new Promise((resolve, reject) => {
      this.hook.apply('initialized', runtimeAction, runtimeAction => {
        try {
          let promise = this.engine.exec(runtimeAction);
          promise
            .then(
              (action: RuntimeAction) => {
                resolve(action.result);
                this.hook.apply('close', runtimeAction, runtimeAction => {
                  this.engine.close(runtimeAction);
                });
              },
              (action: RuntimeAction) => {
                reject(action.result);
                this.hook.apply('close', runtimeAction, runtimeAction => {
                  this.engine.close(runtimeAction);
                });
              }
            )
            .catch((e: any) => {
              if (runtimeAction) {
                runtimeAction.stage = ACTION_READY_STATE.EXCEPTION;
                runtimeAction.error = e;
                this.hook.apply('exception', runtimeAction, runtimeAction => {
                  this.catchError(e);
                  this.hook.apply('close', runtimeAction, runtimeAction => {
                    this.engine.close(runtimeAction);
                  });
                });
              }
            });
        } catch (e) {
          if (runtimeAction) {
            runtimeAction.stage = ACTION_READY_STATE.EXCEPTION;
            runtimeAction.error = e;
            this.hook.apply('exception', runtimeAction, runtimeAction => {
              this.catchError(e);
              this.hook.apply('close', runtimeAction, runtimeAction => {
                this.engine.close(runtimeAction);
              });
            });
          }
        }
      });
    });
  }
  release() {
    this.hook.plugins = [];
  }
  plugin(plugin: Partial<ActionPlugin>) {
    this.hook.plugin(plugin);
  }
  onError(callback: ErrorCallback) {
    this.error = callback;
  }
  private catchError(error: Error) {
    if (!this.error || !this.error(error)) {
      sysErrorHandler(error);
    }
  }
}
export default Invoker;

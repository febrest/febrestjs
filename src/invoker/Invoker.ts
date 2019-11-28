"use strict";

import { AsyncHook } from "../hook";
import { HookPlugin } from "hook/Hook";
import { RuntimeAction } from "action/runtimeAction";

function sysErrorHandler(error: any) {
  console.error(error);
}
/**
 * @description
 * Invoker
 * 负责调用controller
 * 不触发任何广播，广播只有手动调用Broadcast服务去触发
 */
export interface ActionEngine {
  initialize: (
    action: ((payload: any) => any) | string,
    payload: any
  ) => RuntimeAction;
  exec: (action: RuntimeAction) => any;
  close: (action: RuntimeAction) => any;
  exception: (action: RuntimeAction, e: any) => any;
}
export interface ActionPlugin extends HookPlugin {
  initialized: (
    action: RuntimeAction
  ) => RuntimeAction | Promise<RuntimeAction>;
  close: (data: RuntimeAction) => RuntimeAction | Promise<RuntimeAction>;
}
class Invoker {
  private hook = new AsyncHook();
  private engine: ActionEngine;
  private error: any;
  constructor(engine: ActionEngine) {
    this.engine = engine;
  }
  //todos:异步或者同步由controller决定，直接返回controller的返回值
  //好像做不到，因为有中间件
  invoke(action: string | ((payload: any) => any), payload: any) {
    let runtimeAction = this.engine.initialize(action, payload);
    return this.pendingAction(runtimeAction);
  }
  private pendingAction(runtimeAction: RuntimeAction) {
    return new Promise((resolve, reject) => {
      this.hook.apply("initialized", runtimeAction, runtimeAction => {
        try {
          let promise = this.engine.exec(runtimeAction);
          promise
            .then(
              () => {
                resolve(runtimeAction.result);
                this.hook.apply("close", runtimeAction, runtimeAction => {
                  this.engine.close(runtimeAction);
                });
              },
              (e: any) => {
                reject(e);
                this.hook.apply("close", runtimeAction, runtimeAction => {
                  this.engine.close(runtimeAction);
                });
              }
            )
            .catch((e: any) => {
              reject(e);
              this.engine.exception(runtimeAction, e);
              this.catchError(e);
              this.hook.apply("close", runtimeAction, runtimeAction => {
                this.engine.close(runtimeAction);
              });
            });
        } catch (e) {
          reject(e);
          this.engine.exception(runtimeAction, e);
          this.catchError(e);
          this.hook.apply("close", runtimeAction, runtimeAction => {
            this.engine.close(runtimeAction);
          });
        } finally {
        }
      });
    });
  }
  release() {
    this.hook.plugins = [];
  }
  plugin(plugin: ActionPlugin) {
    this.hook.plugin(plugin);
  }
  onError(callback: (error: any) => boolean) {
    this.error = callback;
  }
  private catchError(error: any) {
    if (!this.error || !this.error(error)) {
      sysErrorHandler(error);
    }
  }
}
export default Invoker;

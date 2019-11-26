"use strict";

import Hook from "./Hook";
import { isPromise } from "utils";

class AsyncHook extends Hook {
  // @ts-ignore
  apply(hook: string, data: any, next: (data?: any) => void) {
    let plugins = this.plugins;
    let i = -1;
    let returnValue;
    function apply() {
      i++;
      if (i === plugins.length) {
        return next(data);
      }
      let plugin = plugins[i];
      if (plugin[hook]) {
        returnValue = plugin[hook](data);
        if (returnValue === undefined) {
          apply();
        } else if (isPromise(returnValue)) {
          returnValue.then(
            (v: any) => {
              data = v || data;
              apply();
            },
            (v: any) => {
              data = v || data;
              next(null);
            }
          );
        } else {
          data = returnValue;
          apply();
        }
      }
    }
    apply();
  }
}
export default AsyncHook;

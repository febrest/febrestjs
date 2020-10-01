'use strict';

import Hook from './Hook';
import { isPromise } from 'utils';

class AsyncHook extends Hook {
  // @ts-ignore
  apply<T>(hook: string, data: T, next: (data: T) => void): void {
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
          // @todos
          // error catch maybe needed
          returnValue.then(
            (v: T) => {
              data = v || data;
              apply();
            },
            (v: T) => {
              data = v || data;
              next(data);
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

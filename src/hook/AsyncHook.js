'use strict'
import Hook from './Hook';
import { isPromise } from './../util';
class AsyncHook extends Hook {
    apply(hook, data, next) {
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
                    returnValue.then(v => {
                        data = v || data;
                        apply();
                    }, (v) => {
                        data = v || data;
                        next();
                    })
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
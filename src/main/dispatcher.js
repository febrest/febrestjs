'use strict'
import { Dispatcher } from './../dispatcher';
const exportMethods = ['dispatch', 'subscribe', 'unsubscribe', 'watch', 'removeWatcher', 'plugin'];


function createDispatcher(isPublic) {
    let _dispatcher = new Dispatcher(isPublic);
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
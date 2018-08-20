'use strict'
import Dispatcher from './Dispatcher';
const exportMethods = ['dispatch', 'subscribe', 'unsubscribe', 'watch', 'removeWatcher', 'plugin'];
function createDispatcher() {
  let _dispatcher = new Dispatcher(false);
  let dispatcher = {};
  exportMethods.forEach(method => {
    dispatcher[method] = function (...args) {
      return _dispatcher[method].apply(_dispatcher, args);
    }
  });
  return dispatcher;
}

export default createDispatcher;
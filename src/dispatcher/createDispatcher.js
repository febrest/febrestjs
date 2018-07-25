'use strict'
import Dispatcher from './Dispatcher';
const exportMethods = ['dispatch','subscribe','unsubscribe','watch','removeWatcher'];
function createDispatcher(){
  let _dispatcher = new Dispatcher();
  let dispatcher = {};
  exportMethods.forEach(method=>{
    dispatcher[method] = function(...args){
      return _dispatcher[method].apply(_dispatcher,args);
    }
  });
  return dispatcher;
}

export default createDispatcher;
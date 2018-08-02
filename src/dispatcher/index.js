'use strict'
import createDispatcher from './createDispatcher';


const dispatcher = createDispatcher(true);


function dispatch(key,payload){
  return dispatcher.dispatch(key,payload);
}

function subscribe(callback){
  return dispatcher.subscribe(callback);
}
function unsubscribe(callback){
  return dispatcher.unsubscribe(callback);
}

function watch(callback){
  return dispatcher.watch(callback);
}
function removeWatcher(callback){
  return dispatcher.removeWatcher(callback);
}
export { 
  dispatch,
  subscribe,
  unsubscribe,
  watch,
  removeWatcher
 };
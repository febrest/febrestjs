'use strict'
import { Dispatcher } from './../dispatcher';
import actionEngine from './actionEngine';


const exportMethods = ['dispatch', 'subscribe', 'unsubscribe', 'watch', 'unwatch', 'plugin', 'onError'];


function createDispatcher(isPublic) {
    let _dispatcher = new Dispatcher(isPublic, actionEngine);
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
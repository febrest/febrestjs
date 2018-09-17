'use strict'
import { Dispatcher } from './../dispatcher';
import actionEngine from './actionEngine';


const exportMethods = ['dispatch', 'plugin', 'onError'];


function createDispatcher() {
    let _dispatcher = new Dispatcher(actionEngine);
    let dispatcher = {};
    exportMethods.forEach(method => {
        dispatcher[method] = function (...args) {
            return _dispatcher[method].apply(_dispatcher, args);
        }
    });
    return dispatcher;
}

let dispatcher = createDispatcher();
export default dispatcher;
'use strict'
import { Invoker } from './../invoker';
import actionEngine from './actionEngine';


const exportMethods = ['invoke', 'plugin', 'onError'];


function createInvoker() {
    let _invoker = new Invoker(actionEngine);
    let invoker = {};
    exportMethods.forEach(method => {
        invoker[method] = function (...args) {
            return _invoker[method].apply(_invoker, args);
        }
    });
    return invoker;
}

const invoker = createInvoker();
export default invoker;
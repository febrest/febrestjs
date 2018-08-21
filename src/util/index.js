'use strict'

import { runTransaction, series } from './Transaction';
import paramsForFunction from './paramsForFunction';
import Resolver from './Resolver';


function isObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]';
}
function isPromise(v) {
    if (typeof Promise !== 'undefined' && v instanceof (Promise)) {
        return true;
    } else {
        return false;
    }
}
function copy(source) {
    let dest;
    if (Array.isArray(source)) {
        dest = source.map(v => {
            return copy(v);
        });
    } else if (isObject(source)) {
        dest = {

        }
        for (let o in source) {
            dest[o] = copy(source[o]);
        }
    } else {
        dest = source;
    }
    return dest;
}

function toValue(v) {
    try {
        return JSON.parse(v);
    } catch (e) {
        return v;
    }
}

function toString(v) {
    try {
        return JSON.stringify(v);
    } catch (e) {
        return v;
    }
}
function immediate(callback){
    try{
        return process.nextTick(callback);
    }catch(e){
        try{
            return setImmediate(callback);
        }catch(e){
            return setTimeout(callback);
        }
    }
}
export {
    isObject,
    copy,
    isPromise,
    toValue,
    toString,
    runTransaction,
    series,
    paramsForFunction,
    Resolver,
    immediate
}
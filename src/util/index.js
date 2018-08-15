'use strict'

import {runTransaction,series} from './Transaction';
import paramsForFunction from './paramsForFunction';
import Resolver from './Resolver';


function isObject(v){
    return Object.prototype.toString.call(v)==='[object Object]';
}
function isPromise(v){
    if(typeof Promise !=='undefined' && v instanceof(Promise)){
        return true;
    }else{
        return false;
    }
}
function copy(v){
    if(isArray(v)){
        return v.slice();
    }else if(isObject(v)){
        let dest = {

        }
        for(let o in v){
            dest[o] = copy(v[o]);
        }
        return dest;
    }else{
        return v;
    }
}

function toValue(v){
    try{
       return JSON.parse(v);
    }catch(e){
        return v;
    }
}

function toString(v){
    try{
        return JSON.stringify(v);
    }catch(e){
        return v;
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
    Resolver
}
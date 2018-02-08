'use strict'


function isArray(v){
    return Array.isArray(v);
}
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

function then(result){
    if(isPromise(result)){
        return result
    }else{
        return Promise.resolve(result);
    }
}

/**
 * 获取参数列表
 */
function getArgumentList(func): Array {
    var argsRegExp =  /\(([\s\S]+)\)/;
    var funcS = func.toString();
    var match = funcS.match(argsRegExp);
    if (match&&match[1]) {
        /**
         * todo:可能有bug
         */
        let args = [];
        match[1].split(',').forEach((arg) => {
            args.push(arg.replace(/\s/g, ''));
        })
        return args;
    }
    return [];
}
export default {
    isArray,
    isObject,
    copy,
    isPromise,
    toValue,
    toString,
    then,
    getArgumentList
}
'use strict'

class BaseError extends Error{
    constructor(type,message){
        super(message);
        this.type = type||'base';

    }
    toString(){
        return this.message;
    }
}
let userErrorHandler = function(){
    return false;
}

function catchIt(error:Error){
    if(!userErrorHandler(error)){
        throw error;
    }
}
function onError(errorHandler){
    userErrorHandler = errorHandler;
}
function makeError(message,type){
    throw new BaseError(type,message);
}
export  {
    onError,
    catchIt,
    makeError
}
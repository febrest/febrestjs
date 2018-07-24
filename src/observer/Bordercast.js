'use strict'

class Bordercast{
    constructor(){
        this._callbacks = [];
    }
    next(data){
        this._callbacks.forEach((callback)=>{
           callback(data);
        })
    }
    subscribe(callback){
        this._callbacks.push(callback);
    }
    release(){
        this._callbacks = null
    }
    unsubscribe(callback){
        let callbacks = this._callbacks;
        for(let i = callbacks.length-1;i>=0;i--){
            if(callbacks[i]===callback){
                callbacks.splice(i,1);
                return;
            }
        }
    }
}

export default Bordercast;
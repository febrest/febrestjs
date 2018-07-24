'use strict'
import {exec} from './../action';

import {Observer,Bordercast} from './../observer'
class Dispatcher{
    constructor(){
        this.observer = new Observer();
        this.bordercast = new Bordercast();
    }
    dispatch(key: string, payload: any){

    }
    release(){
        this.bordercast.release();
        this.observer.release();
    }
    subscribe(callback){
        this.bordercast.subscribe(callback);
    }
    unsubcribe(callback){
        this.bordercast.unsubscribe(callback)
    }
    watch(callback){
        this.observer.watch(callback);
    }
    removeWatcher(callback){
        this.observer.removeWatcher(callback)
    }
    
}
function dispatch(key: string, payload: any) {
    return exec(key, payload);
}
export  default Dispatcher;
'use strict'
import {initialize,complete,exec,terminate,getRuntimeAction,setRuntimeAction} from './../action';

import {Observer,Bordercast} from './../observer';

/**
 * @description
 * 公共的dispatcher dispatch出来的action会被所有的dispatcher接收
 * 私有的dispatcher只能接收所有的action，但是dispatch出去的action不会被其他dispatcher接收？
 */
class Dispatcher{
    constructor(isPublic){
        this.observer = new Observer();
        this.bordercast = new Bordercast(isPublic);
    }
    dispatch(key: string, payload: any){
        let runtimeAction = initialize(key,payload);
        let id = runtimeAction.id;
        try{
           let promiseState = exec(runtimeAction);   
           Promise.resolve(promiseState).then(state=>{
            runtimeAction.result={
                state,
                key,
                id
            }
            complete(runtimeAction);
            this.bordercast.next(runtimeAction.result);
           });
        }catch(e){
           terminate(runtimeAction,e);
        }finally{
            return id;
        }

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
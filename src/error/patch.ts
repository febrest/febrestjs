'use strict'
/**
 * @description catch async error 
 */
import catchIt from './catchIt';
function safeExec(func,context,args){
    try{
        if(func){
            return func.apply(context,args);
        }
    }catch(e){
        catchIt(e);   
    }
}
function patch() {
    try {
        (function (global) {
            if (!global) {
                return;
            }
            /**
             * 处理setTimeout，setInteval，requestAnimationFrame，setImmediate
             */
            let patchs = ['setTimeout', 'setInteval', 'requestAnimationFrame', 'setImmediate'];

            patchs.forEach(function (name) {
                let origin = global[name];
                let patch = function (handler, timeout) {
                    return origin.call(global, function(){
                        return safeExec(handler,null,arguments);
                    }, timeout);
                }
                global[name] = patch;
            });

            /**
             * 处理promise
            */
            if (typeof Promise !== 'undefined') {
                let origin = Promise.prototype.then;
                let then = function (resolve, reject) {
                    return origin.call(this, function (data) {
                        return safeExec(resolve,this,[data]);
                    }, function (data) {
                        return safeExec(reject,this,[data]);
                    });
                }
                Promise.prototype.then = then;
            }

        })(typeof window === 'undefined' ? (typeof global === 'undefined' ? undefined : global) : window)


    } catch (e) {
        console.warn(e);
    }

}


export default patch;

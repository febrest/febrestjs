'use strict'
/**
 * @description catch async error 
 */
try{
    (function(global){
        if(!global){
            return;
        }
        let patchs = [];
        patchs.push('setTimeout','setInteval','requestAnimationFrame','setImmediate');

        patchs.forEach(function(name){
            let origin = global[name];
            let patch = function(handler,timeout){
                let newHandler = handler;
                if(handler && typeof handler == 'function'){
                    newHandler = function(){
                        try{
                            handler.apply(null,arguments);
                        }catch(e){
                            
                        }
                    }
                }
            }
        });
        
    })(typeof window === 'undefined'?(typeof global==='undefined'?undefined:global):window)
    

 }catch(e){
     console.warn(e);
 }

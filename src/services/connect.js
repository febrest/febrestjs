'use strict'
/**
 * @description 用于controller持续发出信号
 */


 function Connect(key){
    const key = key;


    return {
        send,
        finish
    }
 }

 export default Connect;
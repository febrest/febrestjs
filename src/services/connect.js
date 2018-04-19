'use strict'
/**
 * @description 用于controller持续发出信号
 */


 function connect(key){
    const key = key;


    return {
        send,
        finish
    }
 }

 export default connect;
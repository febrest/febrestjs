'use strict'
/**
 * @description 用于controller持续发出信号
 */
import {getRuntimeAction} from './../action';

function noop(state) {
    return state;
}
function connect() {
    let action = getRuntimeAction();
    return function $connect(state) {
        /**等action主动结束一次才会执行connect */
        if(!action.result){
            setTimeout(()=>{
                $connect(state);
            },20);
            return;
        }else{
            
        }
        
    }
}

export default connect;
'use strict'
/**
 * @description 用于controller持续发出信号
 */

function noop(state) {
    return state;
}
function connect(action) {
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
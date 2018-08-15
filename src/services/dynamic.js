'use strict'
import {getRuntimeAction} from './../action';
import {getState} from './../provider';

//动态获取provider
function dynamic() {
    let action = getRuntimeAction();

    function $dynamic(name,payload) {
        let stateGetter = getState(name);
        let deps = {
            '$payload': function(){
                return payload;
            }
        }
        return map;
    }
}

export default dynamic;
'use strict'
import {getRuntimeAction} from './../action';

//动态获取provider
function dynamic() {
    let action = getRuntimeAction();
    let map = {

    }
    function $dynamic(name,payload) {
        return map;
    }
}

export default dynamic;
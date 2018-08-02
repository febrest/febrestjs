'use strict'
import { provide, dependencyLookup } from './../util/provide';
import {getRuntimeAction} from './../action';

//动态获取provider
function dynamic() {
    let action = getRuntimeAction();
    let {
        payload
    } = action;
    let map = {

    }
    function $dynamic() {
        return map;
    }

    if (payload && payload.$dynamic) {
        let _dynamic = payload.$dynamic;
        return Promise.all(dependencyLookup(_dynamic, action)).then(function (deps) {
            _dynamic.forEach(function (depName, index) {
                map[depName] = deps[index];
            });
            return $dynamic;
        });
    } else {
        return $dynamic;
    }

}

export default dynamic;
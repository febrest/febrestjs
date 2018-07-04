'use strict'
import { provide, dependencyLookup } from './../util/provide';
//动态获取provider
function dynamic(action) {
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
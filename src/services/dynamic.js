'use strict'
import { ProviderContainer } from './../provider';
import { provide, dependencyLookup } from './../util/provide';
import { makeError } from './../error';
//动态获取provider
function dynamic(action) {
    let {
        payload
    } = action;

    return new Promise(function (resolve, reject) {
        let map = {

        }
        function $dynamic() {
            return map;
        }
        if (payload && payload.$dynamic) {
            let _dynamic = payload.$dynamic;
            Promise.all(dependencyLookup(_dynamic, action)).then(deps => {
                _dynamic.forEach((depName, index) => {
                    map[depName] = deps[index];
                });
                resolve($dynamic);
            });
        } else {
            resolve($dynamic);
        }


    });
}

export default dynamic;
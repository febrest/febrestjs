'use strict'
import { ProviderContainer } from './../provider';
import provide from './../util/provide';
import providerGetState from './../util/providerGetState';
import {makeError} from './../error';
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
            Promise.all(payload.$dynamic.map((providerName) => {
                let provider = ProviderContainer.getProvider(providerName);
                if (!provider) {
                    makeError('不存在名为' + providerName + '的依赖');
                }
                return providerGetState(provide, provider, action).then(v => {
                    map[providerName] = v;
                });
            })).then(() => resolve($dynamic));

        } else {
            resolve($dynamic);
        }


    });
}

export default dynamic;
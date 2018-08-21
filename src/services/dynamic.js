'use strict'
/**
 * 动态获取provider
 * todos:找不到provider的时候要抛出异常
 */
function dynamic(action) {
    function $dynamic(name) {
        let provider = getProvider(name);
        return provider;
    }
}

export default dynamic;
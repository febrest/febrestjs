import executor from './executor';
import register from './register';
import { pendingWatch, doWatch } from './../observer';
import { isPromise } from './../util';


//最大触发时间间隔
const TINK = 200;

let UPDATE_SIZE = 0;
let LAST_DO_WATCH_TIME;

function update(name, action, payload) {
    UPDATE_SIZE++;
    if (!LAST_DO_WATCH_TIME) {
        LAST_DO_WATCH_TIME = Date.now();
    }
    let origin, type;
    if ((origin = register.getState(name))) {
        type = 'state';
    } else if ((origin = register.getProvider(name))) {
        type = 'provider';
    } else {
        makeError(`找不到名为${name}的依赖，请检查依赖是否正确`);
    }
    let result = executor.update(origin, type, action, payload);
    if (isPromise(result)) {
        return result.then(data => {
            updateComplete();
            return data;
        }, (error) => {
            makeError(error);
        })
    } else {
        updateComplete();
        return Promise.resolve(data);
    }
}

function updateComplete(name) {
    UPDATE_SIZE--;
    pendingWatch(name);
    if (UPDATE_SIZE <= 0 || Date.now() - LAST_DO_WATCH_TIME >= LAST_DO_WATCH_TIME) {
        doWatch();
    }
}
export default {
    update
};
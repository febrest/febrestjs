'use strict'

import { ProviderContainer } from './../provider';
import { doWatch } from './../observer';
/**
 * @controller向provider层发出信号
 */

function persist(action) {

    let keys = [];
    let states = [];

    return function $persist(name, state) {
        if (Array.isArray(name)) {
            keys = keys.concat(name);
            states = state.concat(state);
        } else {
            keys.push(name);
            states.push(state);
        }
        let doing = false;

        return new Promise((resolve) => resolve()).then(
            () => {
                doPersist();
                doing = true;
            }
        );
    }
}

function doPersist(doing, keys, states) {
    if (doing) {
        return;
    }
    let changed = {

    }
    Promise.all(
        keys.map((key, i) => {
            changed[key] = true;
            return ProviderContainer.getProvider(key).setState(states[i]);
        })
    ).then(() => {
        doWatch(changed)
    });
}
export default persist;
'use strict'
import Provider from './Provider';
import util from './../util';

var {
    toString,
    toValue
} = util;

const is_localstorage_support = typeof localStorage !== 'undefined';

function stroage(key, value) {
    if (is_localstorage_support) {
        stroage = function (key, value) {
            if (value) {
                localStorage.setItem(key, toString(value));
                return Promise.resolve();
            } else {
                return Promise.resolve(toValue(localStorage.getItem(key)));
            }
        }
        return stroage(key, value);
    } else {
        return Promise.resolve();
    }
}

var storageTool = {
    getter: function (key) {
        return stroage(key);
    },
    setter: function (key,value) {
        return stroage(key,value);
    }
}
class StorageProvider extends Provider {
    _synced: boolean;
    constructor(config) {
        super(config);
    }
    get() {
        if (!this._synced) {
            return storageTool.getter(this.name)
                .then((v) => {
                    if (v) {
                        this.state = v.state;
                    }
                    this._synced = true;
                    return super.get();
                })
        } else {
            return super.get();
        }
    }
    set(state) {
        super.set(state);
        storageTool.setter(this.name, { timestamp: Date.now(), state });

    }
}
function setStorgaeTool(tool) {
    storageTool = tool;
}

StorageProvider.setStorageTool = setStorgaeTool;
export default StorageProvider;
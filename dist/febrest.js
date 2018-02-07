/** @license Apache 2.0 
* version 0.0.1
* febrest.development.js
*
* This source code is licensed under the Apache 2.0 license found in the
* LICENSE file in the root directory of this source tree.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var ActionVendor = function () {
    function ActionVendor() {
        babelHelpers.classCallCheck(this, ActionVendor);

        this._actionsForKey = {};
    }

    babelHelpers.createClass(ActionVendor, [{
        key: 'putActionByKey',
        value: function putActionByKey(key, action) {
            this._actionsForKey[key] = action;
        }
    }, {
        key: 'getActionForKey',
        value: function getActionForKey(key) {
            return this._actionsForKey[key];
        }
    }]);
    return ActionVendor;
}();

var vendor = new ActionVendor();

function createAction(config, controller) {
    /**
     * todo:需要优化
     */
    config.controller = config.controller || controller;
    if (typeof config.controller !== 'function') {
        throw new Error('illegal controller,the type of controller must be function,but got ' + babelHelpers.typeof(config.controller));
    }
    vendor.putActionByKey(config.key, config);
}

function createActions(config) {
    if (Array.isArray(config)) {
        config.forEach(createAction);
    } else {
        createAction(config);
    }
}

function getActionForKey(key) {
   return vendor.getActionForKey(key);
}

function isArray(v) {
    return Array.isArray(v);
}
function isObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]';
}
function isPromise(v) {
    if (typeof Promise !== 'undefined' && v instanceof Promise) {
        return true;
    } else {
        return false;
    }
}
function copy(v) {
    if (isArray(v)) {
        return v.slice();
    } else if (isObject(v)) {
        var dest = {};
        for (var o in v) {
            dest[o] = copy(v[o]);
        }
        return dest;
    } else {
        return v;
    }
}

function toValue(v) {
    try {
        return JSON.parse(v);
    } catch (e) {
        return v;
    }
}

function toString(v) {
    try {
        return JSON.stringify(v);
    } catch (e) {
        return v;
    }
}

function then(result) {
    if (isPromise(result)) {
        return result;
    } else {
        return Promise.resolve(result);
    }
}

/**
 * 获取参数列表
 */
function getArgumentList(func) {
    var argsRegExp = /function\s*\w*\(([\s\S]*?)\)/g;
    if (argsRegExp.test(func.toString())) {
        /**
         * todo:可能有bug
         */
        var args = [];
        RegExp.$1.split(',').forEach(function (arg) {
            args.push(arg.replace(/\s/g, ''));
        });
        return args;
    }
    return [];
}
var util = {
    isArray: isArray,
    isObject: isObject,
    copy: copy,
    isPromise: isPromise,
    toValue: toValue,
    toString: toString,
    then: then,
    getArgumentList: getArgumentList
};

var then$1 = util.then;

/**
 * 
 * 
 * @param {any} controller 
 * @param {any} args
 */

function runAction(controller, args) {
    var state = controller.apply(null, args);
    return then$1(state);
}

var copy$1 = util.copy;

var Provider = function () {
    function Provider(config) {
        babelHelpers.classCallCheck(this, Provider);

        this._value = config.value;
        this._name = config.name;
    }

    babelHelpers.createClass(Provider, [{
        key: 'get',
        value: function get() {
            return copy$1(this._value);
        }
    }, {
        key: 'set',
        value: function set(value) {
            this._value = copy$1(value);
        }
    }]);
    return Provider;
}();

var container = {};
function getProvider(name) {
    return container[name];
}
function setProvider(name, provider) {
    container[name] = provider;
}

var ProviderContainer = {
    setProvider: setProvider,
    getProvider: getProvider
};

var providerImpls = {
    'state': Provider
};
function getProviderImpl(type) {
    var providerImpl = providerImpls[type];
    if (providerImpl) {
        return providerImpl;
    } else {
        
    }
}

function createProvider(config) {
    var ProviderImpls = getProviderImpl(config.type || 'state');
    return new ProviderImpls(config);
}
function use(type, providerImpl) {
    providerImpls[type] = providerImpl;
}

var ProviderCreator = {
    createProvider: createProvider,
    use: use
};

var getArgumentList$1 = util.getArgumentList;
var then$2 = util.then;
var createProvider$1 = ProviderCreator.createProvider;
var getProvider$1 = ProviderContainer.getProvider;


function dependencyLookup(list, payload) {
    var isPayloadUsed = false;
    var args = [];
    /**
     * 需要优化
    */
    if (list) {
        args = list.map(function (key) {
            var provider = ProviderContainer.getProvider(key);
            if (provider) {
                return then$2(provider.get());
            } else if (payload && !isPayloadUsed) {

                /**
                 * payload 确保只传给第一个没匹配到的
                 */
                isPayloadUsed = true;
                return then$2(payload);
            } else {
                return then$2(null);
            }
        });
    }
    return Promise.all(args);
}

function dependencyFromProvider(list) {
    var args = [];
    if (list) {
        args = list.map(function (item) {
            try {
                return then$2(item.get());
            } catch (e) {
                return then$2(item);
            }
        });
    }
    return Promise.all(args);
}

function provide(action, payload) {
    var provider = action.provider;
    var controller = action.controller;
    if (typeof provider === 'function') {
        return dependencyFromProvider(provider(payload, createProvider$1, getProvider$1));
    } else {
        return dependencyLookup(getArgumentList$1(controller), payload);
    }
}

function persist(kv, state) {
    if (!kv) {
        return null;
    }
    var changed = {};
    for (var k in kv) {
        var v = state[k];

        if (v) {
            var name = kv[k];
            var provider = ProviderContainer.getProvider(name);
            if (provider) {
                provider.set(v);
                changed[name] = v;
            }
        }
    }
    return changed;
}

var RemoteProvider = function (_Provider) {
    babelHelpers.inherits(RemoteProvider, _Provider);

    function RemoteProvider(config) {
        babelHelpers.classCallCheck(this, RemoteProvider);

        var _this = babelHelpers.possibleConstructorReturn(this, (RemoteProvider.__proto__ || Object.getPrototypeOf(RemoteProvider)).call(this, config));

        _this._remote = config.remote;
        _this.method = config.method || 'get';
        _this.body = config.body;
        _this.headers = config.headers;
        return _this;
    }

    babelHelpers.createClass(RemoteProvider, [{
        key: 'get',
        value: function get() {
            var headers = undefined;
            if (this.headers) {
                headers = new Headers(this.headers);
            }
            return fetch(this._remote, {
                body: this.body,
                method: this.method,
                headers: headers
            }).then(function (response) {
                return response.text().then(function (text) {
                    return util.toValue(text);
                });
            }, function () {
                return Promise.resolve(null);
            });
        }
    }, {
        key: 'set',
        value: function set() {}
    }]);
    return RemoteProvider;
}(Provider);

var SessionProvider = function (_Provider) {
    babelHelpers.inherits(SessionProvider, _Provider);

    function SessionProvider() {
        babelHelpers.classCallCheck(this, SessionProvider);
        return babelHelpers.possibleConstructorReturn(this, (SessionProvider.__proto__ || Object.getPrototypeOf(SessionProvider)).apply(this, arguments));
    }

    babelHelpers.createClass(SessionProvider, [{
        key: 'get',

        /**
         * 取完之后删除数据
         */
        value: function get() {
            var value = babelHelpers.get(SessionProvider.prototype.__proto__ || Object.getPrototypeOf(SessionProvider.prototype), 'get', this).call(this);
            this._value = null;
            return value;
        }
    }]);
    return SessionProvider;
}(Provider);

var storageTool = {
    getter: function getter() {
        return Promise.resolve();
    },
    setter: function setter() {
        return Promise.resolve();
    }
};

var StorageProvider = function (_Provider) {
    babelHelpers.inherits(StorageProvider, _Provider);

    function StorageProvider(config) {
        babelHelpers.classCallCheck(this, StorageProvider);
        return babelHelpers.possibleConstructorReturn(this, (StorageProvider.__proto__ || Object.getPrototypeOf(StorageProvider)).call(this, config));
    }

    babelHelpers.createClass(StorageProvider, [{
        key: 'get',
        value: function get() {
            var _this2 = this;

            if (!this._synced) {
                return storageTool.getter(this._name).then(function (v) {
                    if (v) {
                        _this2._value = v.value;
                    }
                    _this2._synced = true;
                    return babelHelpers.get(StorageProvider.prototype.__proto__ || Object.getPrototypeOf(StorageProvider.prototype), 'get', _this2).call(_this2);
                });
            } else {
                return babelHelpers.get(StorageProvider.prototype.__proto__ || Object.getPrototypeOf(StorageProvider.prototype), 'get', this).call(this);
            }
        }
    }, {
        key: 'set',
        value: function set(v) {
            babelHelpers.get(StorageProvider.prototype.__proto__ || Object.getPrototypeOf(StorageProvider.prototype), 'set', this).call(this, v);
            storageTool.setter(this._name, { timestamp: Date.now(), value: v });
        }
    }]);
    return StorageProvider;
}(Provider);

function setStorgaeTool(tool) {
    storageTool = tool;
}

StorageProvider.setStorageTool = setStorgaeTool;

var isArray$3 = util.isArray;


function inject(configs) {
    if (isArray$3(configs)) {
        configs.forEach(function (config) {
            return inject(config);
        });
    } else {
        var name = configs.name;
        var value = configs.defaultValue;
        configs.value = value;
        var provider = ProviderCreator.createProvider(configs);
        ProviderContainer.setProvider(name, provider);
    }
}

var use$1 = ProviderCreator.use;

use$1('storage', StorageProvider);
use$1('remote', RemoteProvider);
use$1('session', SessionProvider);

var Provider$2 = {
    Provider: Provider,
    StorageProvider: StorageProvider,
    RemoteProvider: RemoteProvider,
    SessionProvider: SessionProvider,
    provide: provide,
    inject: inject,
    use: use$1,
    persist: persist
};

var PROVIDER_PERSIST_ACTION = 'LIBRARY/PROVIDER_PERSIST_ACTION';
function persist$2(payload) {
    return Provider$2.persist(payload.persist, payload.state);
}
var innerActions = {
    PROVIDER_PERSIST_ACTION: PROVIDER_PERSIST_ACTION,
    actions: [{
        key: PROVIDER_PERSIST_ACTION,
        controller: persist$2
    }]
};

var userErrorHandler = function userErrorHandler() {
    return false;
};

function defaultErrorHandler(error) {
    throw error;
}

function handle(error) {
    if (!userErrorHandler(error)) {
        defaultErrorHandler(error);
    }
}
function onError(errorHandler) {
    userErrorHandler = onError;
}
var error = {
    onError: onError,
    handle: handle
};

var Observer = function () {
    function Observer() {
        babelHelpers.classCallCheck(this, Observer);

        this._callbacks = [];
    }

    babelHelpers.createClass(Observer, [{
        key: 'next',
        value: function next(data) {
            this._callbacks.forEach(function (callback) {
                callback(data);
            });
        }
    }, {
        key: 'subscribe',
        value: function subscribe(callback) {
            this._callbacks.push(callback);
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe(callback) {
            var callbacks = this._callbacks;
            for (var i = callbacks.length - 1; i >= 0; i--) {
                if (callbacks[i] === callback) {
                    callbacks.splice(i, 1);
                    return;
                }
            }
        }
    }]);
    return Observer;
}();

var observer = new Observer();

var errorHandle = error.handle;

var run = function run(action, payload) {
    return Provider$2.provide(action, payload).then(function (args) {
        return runAction(action.controller, args);
    }).then(function (state) {
        return setResult(state, action.key);
    });
};

var id = 0;

function IDGenerator() {
    return ++id;
}

function providerPersist(persist, state) {
    if (persist) {
        exec(innerActions.PROVIDER_PERSIST_ACTION, { persist: persist, state: state });
    }
    return state;
}

function setResult(state, key) {
    var result = {
        state: state,
        key: key
    };
    return result;
}

function pushToObserver(result) {
    observer.next(result);
    return result;
}
function exec(key, payload) {
    var action = getActionForKey(key);
    var id = IDGenerator();

    //捕获所有异常
    run(action, payload).then(function (result) {
        return pushToObserver(result);
    }).then(function (result) {
        return providerPersist(action.persist, result.state);
    }).catch(function (e) {
        return errorHandle(e);
    });

    return id;
}

function applyMiddleWare(middleWare) {
    run = middleWare(run);
}

var exports$1 = {
    createActions: createActions,
    getAction: getActionForKey,
    exec: exec,
    applyMiddleWare: applyMiddleWare,
    PROVIDER_PERSIST_ACTION: innerActions.PROVIDER_PERSIST_ACTION
};
createActions(innerActions.actions);

var applyMiddleWare$1 = exports$1.applyMiddleWare;
var createActions$2 = exports$1.createActions;
var PROVIDER_PERSIST_ACTION$1 = exports$1.PROVIDER_PERSIST_ACTION;
var Provider$3 = Provider$2.Provider;
var StorageProvider$2 = Provider$2.StorageProvider;
var RemoteProvider$2 = Provider$2.RemoteProvider;
var SessionProvider$2 = Provider$2.SessionProvider;
var inject$2 = Provider$2.inject;
var use$2 = Provider$2.use;


module.exports = {
    /**
     * @description
     * exports dispatch
     */
    dispath: dispath,

    /**
     * @description
     * exports action
     */
    createActions: createActions$2,
    applyMiddleWare: applyMiddleWare$1,

    /**
     * @description
     * exports provider
    */
    Provider: Provider$3,
    StorageProvider: StorageProvider$2,
    RemoteProvider: RemoteProvider$2,
    SessionProvider: SessionProvider$2,
    injectProvider: inject$2,
    useProvider: use$2,

    /**
     * 
    */
    subscribe: function subscribe(callback) {
        return observer.subscribe(callback);
    },
    unsubscribe: function unsubscribe(callback) {
        return observer.unsubscribe(callback);
    },
    onError: error.onError,

    /**
     * @constants
    */
    PROVIDER_PERSIST_ACTION: PROVIDER_PERSIST_ACTION$1
};

})));
//# sourceMappingURL=febrest.js.map

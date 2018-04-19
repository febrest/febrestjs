'use strict'
import Provider from './Provider';
import { toValue } from './../util';
class RemoteProvider extends Provider {
    remote: string;
    params: any;
    method: string;
    headers: Headers;
    constructor(config) {
        super(config);
        this.remote = config.remote;
        this.method = config.method || 'get';
        this.body = config.body;
        this.headers = config.headers;
    }
    getState() {
        var headers = undefined;
        if (this.headers) {
            headers = new Headers(this.headers);
        }
        return fetch(this.remote, {
            body: this.body,
            method: this.method,
            headers
        }).then(function (response) {
            return response.text().then(function (text) {
                return toValue(text);
            })
        }, function () {
            return Promise.resolve(null);
        })
    }
    setState() {
        return;
    }
}

export default RemoteProvider;
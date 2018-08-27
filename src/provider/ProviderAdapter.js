'use strict'
class ProviderAdapter {
    query(origin, action, payload) {
        return origin.query(action, payload);
    }
    update(origin, action, payload) {
        return origin.update(action, payload);
    }
    onError({ origin, action, payload, error, type }) {

    }
}

export default new ProviderAdapter();
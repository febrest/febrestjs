'use strict'
class ProviderAdapter {
    fetch(origin, action, payload) {
        return origin.fetch(action, payload);
    }
    update(origin, action, payload) {
        return origin.update(action, payload);
    }
    onError({ origin, action, payload, error, type }) {

    }
}

export default new ProviderAdapter();
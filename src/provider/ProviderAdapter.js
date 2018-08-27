'use strict'
class ProviderAdapter {
    query(origin, action, payload) {
        return origin.query(action, payload);
    }
    update(origin, action, payload) {
        return origin.update(action, payload);
    }
}

export default new ProviderAdapter();
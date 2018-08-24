'use strict'
class ProviderAdapter {
    fetch(provider, action, payload) {
        return provider.fetch
    }
    update(provider, action, payload) {
        return provider.update(action, payload);
    }
    onError(provider, action, payload, error, type) {

    }
}

export default new ProviderAdapter();
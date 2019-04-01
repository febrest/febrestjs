'use strict'
import ProviderWrapper from './ProviderWrapper';
class ProviderRegister {
    constructor() {
        this.providers = new Map();
    }
    register(config) {
        if (Array.isArray(config)) {
            config.forEach((config) => this.register(config))
        } else {
            let provider = new ProviderWrapper(config);
            this.providers.set(config.name, provider)
        }
    }
    getDep(name) {
        return this.providers.get(name)
    }
}

export default new ProviderRegister();
'use strict'
import { ProviderExecutor } from './../provider';
import Register from './Register';

function ProviderFactory(config) {
    config.$$typeof = 'ProviderConfig';
    return config;
}

class ProviderInjection extends Register{
    getDep(name) {
        let provider = this.container[name];
        if (provider && provider.$$typeof === 'ProviderConfig') {
            provider = this.container[name] = new ProviderExecutor(provider);
        }
        return provider;
    }
}

export default new ProviderInjection(ProviderFactory);
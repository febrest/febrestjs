'use strict'
import { createProvider } from './ProviderCreator';
const container = {

}
function getProvider(name) {
    let provider = container[name];
    if (provider && provider.$$typeof === 'ProviderConfig') {
        provider = container[name] = createProvider(provider);
    }
    return provider;
}
function setProvider(name, provider) {
    container[name] = provider;
}

export {
    setProvider,
    getProvider
}
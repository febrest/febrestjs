'use strict'
import ProviderWrapper from './ProviderWrapper';
function ProviderFactory(config) {
    let provider = new ProviderWrapper(config);
    return provider;
}

export default ProviderFactory;
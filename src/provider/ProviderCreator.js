'use strict'
import Provider from './Provider'
import State from './State';
import ProviderExecutor from './ProviderExecutor';
function createProvider(config) {
    let ProviderClass = config.type || Provider;
    let provider = new ProviderClass({
        name: config.name
    });
    let state = new State(config.defaultState || {});
    let providerExecutor = new ProviderExecutor(provider, state);
    provider.onCreate(state.get());
    return providerExecutor;
}
export {
    createProvider,
}
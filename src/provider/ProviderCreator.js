'use strict'
import Provider from './Provider'
import State from './State';
import ProviderExecutor from './ProviderExecutor';
import { copy } from './../util'
function createProvider(config) {
    let ProviderClass = config.type || Provider;
    let provider = new ProviderClass({
        name: config.name
    });
    let state = new State(config.defaultState || {});
    let providerExecutor = new ProviderExecutor(provider, state);
    provider.onCreate(copy(state.get()));
    return providerExecutor;
}
export {
    createProvider,
}
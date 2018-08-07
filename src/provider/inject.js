'use strict'

import {setProvider} from './ProviderContainer';
import {createProvider} from './ProviderCreator';

function inject(configs) {
    if (Array.isArray(configs)) {
        configs.forEach(function (config) {
            return inject(config);
        });
    } else {
        let name = configs.name;
        let state = configs.defaultState;
        configs.state = state;
        let provider = createProvider(configs);
        setProvider(name, provider);
    }
}

export default inject;
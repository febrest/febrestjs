'use strict'

import { setProvider } from './ProviderContainer';

function inject(configs) {
    if (Array.isArray(configs)) {
        configs.forEach(function (config) {
            return inject(config);
        });
    } else {
        let name = configs.name;
        configs.$$typeof = 'ProviderConfig';
        setProvider(configs);
    }
}

export default inject;
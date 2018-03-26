'use strict'

import util from './../util';
import ProviderContainer from './ProviderContainer';
import ProviderCreator from './ProviderCreator';


var {
    isArray
} = util;

function inject(configs) {
    if (isArray(configs)) {
        configs.forEach(function (config) {
            return inject(config);
        });
    } else {
        var name = configs.name;
        var state = configs.defaultState;
        configs.state = state;
        var provider = ProviderCreator.createProvider(configs);
        ProviderContainer.setProvider(name, provider);
    }
}

export default inject;
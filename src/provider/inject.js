'use strict'

import { isArray } from './../util';
import ProviderContainer from './ProviderContainer';
import ProviderCreator from './ProviderCreator';
import {catchIt} from './../error';


function inject(configs) {
    if (isArray(configs)) {
        configs.forEach(function (config) {
            return inject(config);
        });
    } else {
        try{
            let name = configs.name;
            let state = configs.defaultState;
            configs.state = state;
            let provider = ProviderCreator.createProvider(configs);
            ProviderContainer.setProvider(name, provider);
        }catch(e){
            catchIt(e);
        }
        
    }
}

export default inject;
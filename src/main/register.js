'use strict'
import { ActionRegister } from './../action';
import { ProviderRegister } from './../provider';
// import { ServiceRegister } from './../service';
// import { StateRegister } from './../state';

function registerAction(config) {
    return ActionRegister.registerAction(config);
}

function getAction(name) {
    return ActionRegister.getAction(name);
}
// function registerService(name, service) {
//     return ServiceRegister.register({ name, service });
// }
// function getService(name) {
//     return ServiceRegister.getDep(name);
// }

function registerProvider(config) {
    return ProviderRegister.register(config);
}

function getProvider(name) {
    return ProviderRegister.getDep(name);
}
// function registerState(config) {
//     return StateRegister.register(config);
// }

// function getState(name) {
//     return StateRegister.getDep(name);
// }

export default {
    registerAction,
    registerProvider,
    // registerService,
    // registerState,
    getAction,
    getProvider,
    // getService,
    // getState
}
'use strict'
import { ActionRegister } from './../action';
import { ProviderRegister } from './../provider';
import { ServiceRegister } from './../services';
import { StateRegister } from './../state';


function registerAction(config) {
    if (Array.isArray(config)) {
        config.forEach(registerAction)
    } else {
        let {
            key,
            controller
        } = config;
        return ActionRegister.register({ key, controller });
    }
}

function getAction(name){
    return ActionRegister.getDep(name);
}
function registerService(name, service) {
    return ServiceRegister.register({ name, service });
}
function getService(name){
    return ServiceRegister.getDep(name);
}

function registerProvider(config) {
    return ProviderRegister.register(config);
}

function getProvider(name){
    return ProviderRegister.getDep(name);
}
function registerState(config) {
    return StateRegister.register(config);
}

function getState(name){
    return StateRegister.getDep(name);
}

export default {
    registerAction,
    registerProvider,
    registerService,
    registerState,
    getAction,
    getProvider,
    getService,
    getState
}
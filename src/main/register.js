'use strict'
import { ActionRegister } from './../action';
import { ProviderRegister } from './../provider';
import { ServiceRegister, payload } from './../services';
import { StateRegister } from './../state';

function registerAction(config) {
    return ActionRegister.register(config);
}

function getAction(name) {
    return ActionRegister.getDep(name);
}
function registerService(name, service) {
    return ServiceRegister.register({ name, service });
}
function getService(name) {
    return ServiceRegister.getDep(name);
}

function registerProvider(config) {
    return ProviderRegister.register(config);
}

function getProvider(name) {
    return ProviderRegister.getDep(name);
}
function registerState(config) {
    return StateRegister.register(config);
}

function getState(name) {
    return StateRegister.getDep(name);
}

registerService('$payload', payload);

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
'use strict'

import payload from './payload';
import connect from './connect';
import dynamic from './dynamic';
import {getRuntimeAction} from './../action';
import {makeError} from './../error';
const perfix = '$';

const services = {

}
function inject(name,service){
    name = perfix+name;
    services[name] = service;
}
inject('payload',payload);
inject('connect',connect);
inject('dynamic',dynamic);

function getService(name){
    let service;
    if(!(service = services[name])){
        makeError(`service ${name} is not exist`);
    }
    let action = getRuntimeAction();

    return service(action);

}
export  {
    getService,
    inject
};
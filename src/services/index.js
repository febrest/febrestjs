'use strict'

import payload from './payload';
import connect from './connect';
import persist from './persist';

const perfix = '$';

const services = {

}
function inject(name,service){
    name = perfix+name;
    services[name] = service;
}
inject('persist',persist);
inject('payload',payload);
inject('connect',connect);

function getService(name,key,payload){
    let service;
    if(!(service = services[name])){
        throw new Error(`service ${name} is not exist`);
    }
    return service(key,payload);

}
export  {
    getService
};
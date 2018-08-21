import Register from './Register';


function ServiceFactory(config){
    let {
        service
    } = config;
    service.$typeof$ = 'Service';
    return service;
}
class ServicesInjection extends Register{
    getDep(name){
        return this.container[name];
    }
}

export default new ServicesInjection(ServiceFactory);
function ServiceFactory(config){
    let {
        service
    } = config;
    service.$typeof$ = 'Service';
    return service;
}

export default ServiceFactory;
class Register {
    constructor(factory){
        this.container = {};
        this.factory = factory;
    }
    register(config){
        if(Array.isArray(config)){
            config.forEach(c=>{
                this.register(c);
            })
        }else{
            this.container[config.name] = this.factory(config);
        }
    }
    getDep(name){
        return this.container[name];
    }
}

export default Register;
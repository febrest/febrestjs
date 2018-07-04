class BaseError extends Error{
    constructor(type,message){
        super(message);
        this.type = type||'base';

    }
    toString(){
        return this.message;
    }
}

export default BaseError;
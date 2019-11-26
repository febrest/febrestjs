import BaseError from './BaseError';
function makeError(message,type){
    throw new BaseError(type,message);
}

export default makeError;
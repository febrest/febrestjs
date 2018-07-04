import {setUserErrorHandler} from './errorHandler';


function onError(handler){
    setUserErrorHandler(handler);
}

export default onError;
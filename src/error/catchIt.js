
import {getUserErrorHandler,getSysErrorHandler} from './errorHandler';
function catchIt(error){
    let handler = getUserErrorHandler();
    let sysHandler = getSysErrorHandler();
    if(!handler || !handler(error)){
        sysHandler(error);
    }
}

export default catchIt;
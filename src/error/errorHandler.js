

let userErrorHandler;

function sysErrorHandler(error){
    throw error;
}
function setUserErrorHandler(handler){
    userErrorHandler = handler;
}

function getUserErrorHandler(){
    return userErrorHandler;
}

function getSysErrorHandler(){
    return sysErrorHandler;
}

export {
    setUserErrorHandler,
    getUserErrorHandler,
    getSysErrorHandler
};
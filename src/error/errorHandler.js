

let userErrorHandler;

function sysErrorHandler(error){
    console.error(error);
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
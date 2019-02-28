

/** 
 * path : controller
*/
let ACTION_MAP = {

}
const controllers = {

}

function route (path) {
    let paths = path.split('/');
    let controller = controllers;
    paths.every(path=>{
        controller = controllers[path];
        return !!controller;
    })
    return controller;
}


function setActionMap(map) {
    ACTION_MAP = {
        ...ACTION_MAP,
        ...map
    }
}

export {
    route,
    setActionMap
}
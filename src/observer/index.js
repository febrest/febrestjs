import Observer from './Observer';
import {
    doWatch,
    watch,
    removeWatcher
} from './watcher';


function subscribe(callback){
    return Observer.subscribe(callback);
}
function unsubscribe(callback){
    return Observer.unsubscribe(callback);
}
function next(data){
    return Observer.next(data);
}
export  {
    subscribe,
    unsubscribe,
    next,
    doWatch,
    watch,
    removeWatcher
}
import Observer from './Observer';

function subscribe(callback){
    return Observer.subscribe(callback);
}
function unsubscribe(callback){
    return Observer.unsubscribe(callback);
}
function next(data){
    return Observer.next(data);
}
export default {
    subscribe,
    unsubscribe,
    next
}
export default Observer;
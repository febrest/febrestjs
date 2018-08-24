'use strict'
class StateAdapter{
    fetch(origin,action,payload){
        return origin.get();
    }
    update(origin,action,payload){
        return origin.set(payload);
    }
    onError({ origin, action, payload, error, type }) {

    }
}

export default new StateAdapter();
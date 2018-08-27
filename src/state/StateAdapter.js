'use strict'
class StateAdapter{
    query(origin,action,payload){
        return origin.get();
    }
    update(origin,action,payload){
        return origin.set(payload);
    }
    onError({ origin, action, payload, error, type }) {

    }
}

export default new StateAdapter();
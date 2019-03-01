'use strict'
class StateAdapter{
    query(origin,method,payload){
        return origin.get();
    }
    update(origin,method,payload){
        return origin.set(payload);
    }
}

export default new StateAdapter();
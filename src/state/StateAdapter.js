'use strict'
class StateAdapter{
    query(origin,action,payload){
        return origin.get();
    }
    update(origin,action,payload){
        return origin.set(payload);
    }
}

export default new StateAdapter();
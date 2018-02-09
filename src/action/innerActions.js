'use strict'
import Provider from './../provider'
import constants from './../constants';

const PROVIDER_PERSIST_ACTION = constants.PROVIDER_PERSIST_ACTION;
function meaningless(v) {
    return v;
}

function persist(payload){
    return Provider.persist(payload.persist,payload.state);
}
export default {
    actions: [
        {
            key:PROVIDER_PERSIST_ACTION,
            controller: persist
        }
    ]
};
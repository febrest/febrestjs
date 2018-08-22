'use strict';

function StateFactory(config){
    return new State(config.defaultState);
}

export default StateFactory;
'use strict';
import State from './State';
function StateFactory(config){
    return new State(config.defaultState);
}

export default StateFactory;
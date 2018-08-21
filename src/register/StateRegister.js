
import State from './State';
import Register from './Register';


function StateFactory(config){
    return new State(config.defaultState);
}

class StateInjection extends Register{
    getDep(){
        return this.container[name];
    }
}

export default new StateInjection(StateFactory);

import {makeError} from './../error'
import {Provider} from './../provider'
function query(name,action,payload) {
  let origin;
  // if ((origin = register.getState(name))) {
  //     return executor.query(origin, 'state', action, payload);
  // } else 
  if ((origin = Provider.getProvider(name))) {
    return origin.query(action, payload);
  } else {
    makeError(`找不到名为${name}的依赖，请检查依赖是否正确`);
  }
}

function update(name,action,payload){

}
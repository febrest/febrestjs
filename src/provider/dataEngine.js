
import { makeError } from './../error'
import { getProvider } from './inject'
function query(name, action, payload) {
  let origin;
  if ((origin = getProvider(name))) {
    return origin.query(action, payload);
  } else {
    makeError(`找不到名为${name}的依赖，请检查依赖是否正确`);
  }
}

function update(name, action, payload) {
  let origin;

  if ((origin = getProvider(name))) {
    return origin.update(action, payload);
  } else {
    makeError(`找不到名为${name}的依赖，请检查依赖是否正确`);
  }
}

export {
  query,
  update
}
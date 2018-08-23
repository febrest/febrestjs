import executor from './executor';
import register from './register';
function update(name, action, payload) {
    let origin;
    if ((origin = register.getState(name))) {
        return executor.update(origin, 'state', action, payload);
    } else if ((origin = register.getProvider(name))) {
        return executor.update(origin, 'provider', action, payload);
    } else {
        makeError(`找不到名为${name}的依赖，请检查依赖是否正确`);
    }
}
export default {
    update
};
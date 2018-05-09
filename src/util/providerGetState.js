'use strict'
function providerGetState(provide,provider, action) {
    return provide(provider.getState, action).then(args => {
        return provider.getState.apply(provider, args);
    });
}
export default providerGetState;
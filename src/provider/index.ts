'use strict';

/**
 * @description
 * state的聚合，自动管理和更新state的状态
 */
import Provider from './Provider';

function startProvider(provider: Provider | Provider[]) {
  if (!Array.isArray(provider)) {
    provider = [provider];
  }
  provider.forEach(p => {
    p.start();
  });
}
function stopProvider(provider: Provider | Provider[]) {
  if (!Array.isArray(provider)) {
    provider = [provider];
  }
  provider.forEach(p => {
    p.stop();
  });
}
export { Provider, startProvider, stopProvider };

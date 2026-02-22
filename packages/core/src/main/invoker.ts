import { Invoker } from 'invoker';
import actionEngine from './action-engine';

function createInvoker() {
  const _invoker = new Invoker(actionEngine);
  return {
    invoke(ctrl, payload) {
      return _invoker.invoke(ctrl, payload);
    },
    plugin(plugin) {
      return _invoker.plugin(plugin);
    },
    onError(callback) {
      return _invoker.onError(callback);
    },
  };
}

const invoker = createInvoker();
export default invoker;

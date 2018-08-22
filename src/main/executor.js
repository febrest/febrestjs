import {Executor} from './../executor'
import {ProviderAdapter} from './../provider'
import {StateAdapter} from './../state'

const executor = new Executor();

executor.addAdapter('provider',ProviderAdapter);
executor.addAdapter('state',StateAdapter);

export default executor;
import {DataEngine} from './../dataEngine'
import {ProviderAdapter} from '../provider'
// import {StateAdapter} from '../state'

const dataEngine = new DataEngine();

dataEngine.addAdapter('provider',ProviderAdapter);
// dataEngine.addAdapter('state',StateAdapter);

export default dataEngine;
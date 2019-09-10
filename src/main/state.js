import {state as s,batch} from './../state'
import Observer from './../Observer'

const observer = new Observer()
const state = function(name) {
  return s(name,observer)
}
state.observe = function(l){
  return observer.observe(l)
}
state.batch = batch;

export default state;
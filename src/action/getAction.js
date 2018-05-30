import ActionVendor from './ActionVendor';
import {makeError} from './../error';
function getActionForKey(key:string){
   let action = ActionVendor.getActionForKey(key);
   if(!action){
       return makeError('action '+ key +' is not exist');
   }
    return {
        key:action.key,
        controller:action.controller
    }
}

export default getActionForKey;
import ActionVendor from './ActionVendor';
function getActionForKey(key:string){
   let action = ActionVendor.getActionForKey(key);
    return {
        key:action.key,
        controller:action.controller
    }
}

export default getActionForKey;
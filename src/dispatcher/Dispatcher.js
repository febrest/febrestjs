'use strict'
import Action from './../action';


function dispatch(key: string, payload: any) {
    return Action.exec(key, payload)
}
export default {
    dispatch,
}
'use strict'
import {exec} from './../action';


function dispatch(key: string, payload: any) {
    return exec(key, payload);
}
export  {
    dispatch,
}
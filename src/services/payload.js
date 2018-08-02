'use strict'
import {getRuntimeAction} from './../action';

function payload(){
    let action = getRuntimeAction();
    return function $payload(){
        return action.payload;
    }
}

export default payload;
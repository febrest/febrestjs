'use strict'
import {getRuntimeAction} from './../action';

function payload(){
    let {payload:p} = getRuntimeAction();
    return function $payload(){
        return p;
    }
}

export default payload;
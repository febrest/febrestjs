'use strict'

function payload(action){
    return function $payload(){
        return action.payload
    }
}

export default payload;
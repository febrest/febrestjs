import { message } from './../bordercast'

function $bordercast() {
    return function bordercast(key, data) {
        let event = {
            key,
            data
        }
        message(event);
    }
}

export default $bordercast;
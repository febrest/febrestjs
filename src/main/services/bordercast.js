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

$bordercast.name = '$bordercast';
export default $bordercast;
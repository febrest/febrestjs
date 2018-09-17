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

try {
    $bordercast.name = $bordercast.name || '$bordercast';
} catch (e) {

}
export default $bordercast;
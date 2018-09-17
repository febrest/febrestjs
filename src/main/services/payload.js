'use strict'
function $payload(action) {
    return action.payload;
}
try {
    $payload.name = $payload.name || ' $payload';
} catch (e) {

}
export default $payload;
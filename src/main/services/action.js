function $action(action) {
    return action;
}

try {
    $action.name = $action.name || ' $action';
} catch (e) {

}
export default $action;
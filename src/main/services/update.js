import updater from './../updater'

const update = updater.update;

function $update() {
    return update;
}
try {
    $update.name = $update.name || '$update';
} catch (e) {

}

export default $update;
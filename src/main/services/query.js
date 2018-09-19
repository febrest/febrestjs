import fetcher from './../fetcher'
const query = fetcher.query;

function $query() {
    return query;
}
try {
    $query.name = $query.name || '$query';
} catch (e) {

}

export default $query;
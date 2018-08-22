
import fetcher from './fetcher'
function resolveParams(params) {
    if (!params) {
        return params;
    }
    return params.map(name => {
        return fetcher(name);
    });
}
export default resolveParams;
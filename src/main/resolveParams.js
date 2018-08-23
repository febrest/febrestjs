
import fetcher from './fetcher';
import { getRuntimeAction } from './../action';

let find = fetcher.find;
function resolveParams(params) {
    let action = getRuntimeAction();
    if (!params) {
        return params;
    }
    return params.map(name => {
        return find(name, action);
    });
}
export default resolveParams;
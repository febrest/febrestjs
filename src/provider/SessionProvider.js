'use strict'
import Provider from './Provider';

class SessionProvider extends Provider{
    /**
     * 取完之后删除数据
     */
    get(){
        var state = super.get();
        this.state = undefined;
        return state;
    }
    
}
export default SessionProvider
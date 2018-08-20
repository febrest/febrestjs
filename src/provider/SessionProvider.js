'use strict'
import Provider from './Provider';

class SessionProvider extends Provider{
    /**
     * 取完之后删除数据
     */
    query(){
        let state = super.getState();
        this.state = undefined;
        return state;
    }
    
}
export default SessionProvider
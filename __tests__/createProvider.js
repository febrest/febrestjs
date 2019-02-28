let febrest = require('./../src');
const CommomProvider = {
    getState:function(){
        return 'CommomProvider'
    }
}

test('use provider',()=>{
    febrest.useProvider('common',CommomProvider);
});
test('create provider',()=>{
    febrest.injectProvider({type:'common',name:'commonProvider'});
})
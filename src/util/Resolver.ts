'use strict';

class Resolver{
    constructor(){
        
    }
} 

function resolve(resolvers,complete,error){
    if(!Array.isArray(resolvers)){
        resolvers = [resolvers];
    }
    let result = [];
    resolvers.forEach(resovler=>{
        let {params,fn} = resovler;
        if(!params){
            result.push(fn());
        }else{
           Promise.all(
                params.map(param=>{
                    return deps[param];
                })
           ).then(p=>{
               try{
                    complete(fn.apply(null,p));
               }catch(e){
                   error(e)
               }
               
           }) 
           
        }
    });
}

Resolver.resolve = resolve;

export default Resolver;
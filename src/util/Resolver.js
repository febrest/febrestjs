'use strict';

function Resolver(params,fn){
    return {
        $typeof$:'Resolver',
        params,
        fn
    }
}

function resolve(resolvers,deps,complete,error){
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
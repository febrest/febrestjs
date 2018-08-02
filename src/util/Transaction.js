/**
 * @description 主要用于执行异步任务
 */

function runTransaction({initialize,run,close,error}){
  initialize();
  let result;
  try{
    result = run();
  }catch(e){
    error(e);
  }
  if(result instanceof Promise){
    result.then(close).catch(error);
  }else{
    close(result);
  }
}

export {
  runTransaction
}
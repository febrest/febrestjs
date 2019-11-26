/**
 * @description 主要用于执行异步任务
 */

export interface Transaction {
  initialize: () => void;
  run: (payload: any) => void;
  close: (payload: any) => void;
  error: (payload: any) => void;
}
function runTransaction({ initialize, run, close, error }: Transaction) {
  let init = initialize();
  let result: any;
  try {
    result = run(init);
    if (result instanceof Promise) {
      result.then(close, error).catch(error);
    } else {
      close(result);
    }
  } catch (e) {
    error(e);
  }
}

function connect(f1: (data?: any) => void, f2: (data?: any) => void) {
  return function(data: any) {
    f1(data);
    f2();
  };
}
function series(transactions: Transaction[]) {
  let i = transactions.length - 1;
  let transaction = transactions[i];
  let trans = [transaction];
  i--;
  for (; i >= 0; i--) {
    let t = transactions[i];
    let transaction = trans[0];
    trans.unshift({
      initialize: t.initialize,
      run: t.run,
      close: connect(t.close, transaction.initialize),
      error: t.error
    });
  }
  trans[0].initialize();
}
export { runTransaction, series };

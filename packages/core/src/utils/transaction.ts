/**
 * @description 主要用于执行异步任务
 */

export interface Transaction<T = unknown, S = unknown> {
  initialize: () => T;
  run: (payload: T) => S | Promise<S>;
  close: (payload: S) => void;
  error: (payload: Error) => void;
}
export const runTransaction = async <T, S>({
  initialize,
  run,
  close,
  error,
}: Transaction<T, S>) => {
  const init = initialize();
  let result: S | Promise<S>;
  try {
    result = run(init);
    if (result instanceof Promise) {
      close(await result);
    } else {
      close(result);
    }
  } catch (e) {
    error(e as Error);
  }
};

const connect = <T>(f1: (data?: T) => void, f2: () => void) => {
  return (data: T) => {
    f1(data);
    f2();
  };
};
export function series(transactions: Transaction[]) {
  let i = transactions.length - 1;
  const transaction = transactions[i];
  const trans = [transaction];
  i--;
  for (; i >= 0; i--) {
    const t = transactions[i];
    const transaction = trans[0];
    trans.unshift({
      initialize: t.initialize,
      run: t.run,
      close: connect(t.close, transaction.initialize),
      error: t.error,
    });
  }
  trans[0].initialize();
}

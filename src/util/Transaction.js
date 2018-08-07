/**
 * @description 主要用于执行异步任务
 */

function runTransaction({ initialize, run, close, error }) {
	let init = initialize();
	let result;
	try {
		result = run(init);
		if (result instanceof Promise) {
			result.then(close).catch(error);
		} else {
			close(result);
		}
	} catch (e) {
		error(e);
	}

}

function connect(f1, f2) {
	return function (...args) {
		f1(...args);
		f2();
	}
}
function series(transactions) {
	let i = transactions.length - 1;
	let transaction = transactions[i]
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
export {
	runTransaction,
	series
}
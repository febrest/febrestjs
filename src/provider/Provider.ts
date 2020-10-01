'use strict';

import { all, batchInject, getProvider, inject } from './inject';
import { query, update } from './dataEngine';
//类似于一个自动运行的线程，当某些条件触发的时候，会自动执行某些方法。

class Provider {
  $typeof$ = 'Provider';
  onStateChange() {}
  onBroadcast() {}
  start() {}
  stop() {}
}

export default Provider;

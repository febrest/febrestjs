import {
  clearRuntimeAction,
  createRuntimeAction,
  getRuntimeAction,
  setRuntimeAction,
} from 'action';

import { RuntimeAction } from 'action/runtimeAction';

let action: RuntimeAction | undefined;
test('runtime action', () => {
  const fn = jest.fn(x => x);
  action = createRuntimeAction('test', fn, 5);
  setRuntimeAction(action);
  expect(action.$typeof$).toBe('RuntimeAction');
  expect(action.controller).toBe(fn);
  expect(action.payload).toBe(5);
  expect(action.name).toBe('test');
  expect(getRuntimeAction()).toBe(action);
  clearRuntimeAction(action);
  expect(action.controller).toBeUndefined();
  expect(action.payload).toBeUndefined();
});

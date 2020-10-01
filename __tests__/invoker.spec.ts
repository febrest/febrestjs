import { Invoker } from 'invoker';
import actionEngine from 'main/actionEngine';

const invoker = new Invoker(actionEngine);
test('invoker invoke', () => {
  const fn = jest.fn(x => x);
  expect(invoker.invoke(fn, 'test')).resolves.toBe('test');
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0]).toBe('test');
  expect(fn.mock.results[0].value).toBe('test');
});

test('invoker plugin', () => {
  const sq: number[] = [];
  const fn = jest.fn(x => {
    sq.push(2);
    return x;
  });
  const initialized = jest.fn(x => {
    sq.push(1);
    return x;
  });
  const close = jest.fn(x => {
    sq.push(3);
    return x;
  });
  invoker.plugin({
    initialized,
    close,
  });
  return invoker.invoke(fn, 'test').then(v => {
    expect(v).toBe('test');
    expect(initialized.mock.calls.length).toBe(1);
    expect(initialized.mock.calls[0][0]).toBe(
      initialized.mock.results[0].value
    );
    expect(close.mock.calls.length).toBe(1);
    expect(close.mock.calls[0][0]).toBe(close.mock.results[0].value);
    expect(close.mock.calls[0][0]).toBe(initialized.mock.results[0].value);
    expect(sq.join('')).toBe('123');
  });
});

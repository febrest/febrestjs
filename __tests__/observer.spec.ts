import Observer from 'observer';

let observer: Observer = new Observer();

const observerListener1 = jest.fn(x => x);
const observerListener2 = jest.fn(x => x);
const observerListener3 = jest.fn(x => x);
const observerListener4 = jest.fn(x => x);
const ob1 = Observer.observe(observerListener1);
const ob2 = observer.observe(observerListener2);
const ob3 = observer.observe('jest', observerListener3);
const ob4 = observer.observe('jest2', observerListener4);
test('observer dispatch', () => {
  Observer.dispatch({ message: 'test' });
  expect(observerListener1.mock.calls.length).toBe(1);
  expect(observerListener2.mock.calls.length).toBe(0);
});

test('observer private dispatch', () => {
  observer.dispatch('jest', { message: 'test' });
  expect(observerListener1.mock.calls.length).toBe(2);
  expect(observerListener2.mock.calls.length).toBe(1);
  expect(observerListener3.mock.calls.length).toBe(1);
  expect(observerListener4.mock.calls.length).toBe(0);
  observer.dispatch('jest2', { message: 'test' });
  expect(observerListener1.mock.calls.length).toBe(3);
  expect(observerListener2.mock.calls.length).toBe(2);
  expect(observerListener3.mock.calls.length).toBe(1);
  expect(observerListener4.mock.calls.length).toBe(1);
});
test('observer private remove', () => {
  ob1.remove();
  ob2.remove();
  ob3.remove();
  ob4.remove();
  observer.dispatch('jest', { message: 'test' });
  expect(observerListener1.mock.calls.length).toBe(3);
  expect(observerListener2.mock.calls.length).toBe(2);
  expect(observerListener3.mock.calls.length).toBe(1);
  expect(observerListener4.mock.calls.length).toBe(1);
  observer.dispatch('jest2', { message: 'test' });
  expect(observerListener1.mock.calls.length).toBe(3);
  expect(observerListener2.mock.calls.length).toBe(2);
  expect(observerListener3.mock.calls.length).toBe(1);
  expect(observerListener4.mock.calls.length).toBe(1);
});

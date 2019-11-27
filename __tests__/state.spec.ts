import { batch, setObserver, state } from "state";

import { IState } from "state/State";
import Observer from "observer";

let states: IState[] = [];
state("test");

test("state", () => {
  expect(state("test").get()).toBeNull();
});

test("state set", () => {
  state("test").set("test");
  expect(state("test").get()).toBe("test");
  state("test").set({ message: "test" });
  expect(state("test").get()).toEqual({ message: "test" });
});
test("state replace", () => {
  state("test").replace("test2");
  expect(state("test").get()).toBe("test2");
  state("test").replace({ message: "test" });
  expect(state("test").get()).toEqual({ message: "test" });
});

test("state clear", () => {
  state("test").clear();
  expect(state("test").get()).toBeNull();
});
test("state toString", () => {
  state("test").set("test");
  expect(state("test").toString()).toBe("test");
  state("test").set(null);
  expect(state("test").toString()).toBe("null");
  state("test").set(true);
  expect(state("test").toString()).toBe("true");
});

test("state observe without observer", () => {
  const ob = state("test").observe(c => {});
  expect(ob).toBeUndefined();
});

test("state change without observer", () => {
  const fn = jest.fn(() => {});
  const ob = state("test").observe(fn);
  expect(ob).toBeUndefined();
  state("test").set("test");
  expect(fn.mock.calls.length).toBe(0);
});

test("state observe", () => {
  setObserver(new Observer());
  const fn = jest.fn(c => {});
  state("test").observe(fn);
  state("test").clear();
  state("test").set("test");
  state("test").replace("jest");
  expect(fn.mock.calls.length).toBe(3);
  //@ts-ignore
  expect(fn.mock.calls[0][0].current).toBeNull();
  //@ts-ignore
  expect(fn.mock.calls[1][0].current).toBe("test");
  //@ts-ignore
  expect(fn.mock.calls[2][0].current).toBe("jest");
});

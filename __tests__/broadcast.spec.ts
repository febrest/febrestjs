import { Broadcast } from "broadcast";

const broadcast = new Broadcast();

const bl = jest.fn(x => x);

test("broadcast", () => {
  broadcast.subscribe(bl);
  broadcast.message("test", "test data");
  expect(bl.mock.calls.length).toBe(1);
  expect(bl.mock.calls[0][0]).toEqual({ cmd: "test", data: "test data" });
  expect(bl.mock.results[0].value).toEqual({ cmd: "test", data: "test data" });
  broadcast.unsubscribe(bl);
  broadcast.message("test", "test data");
  expect(bl.mock.calls.length).toBe(1);
});

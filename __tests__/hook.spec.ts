import { AsyncHook, Hook } from "hook";

let hook: Hook | undefined;
let asyncHook: AsyncHook | undefined;
const hookApplyResult: string[] = [];
const asyncHookApplyResult: string[] = [];
const hookPlugins = [
  {
    start: (message: string) => {
      hookApplyResult.push(message + " 1");
      console.log("plugin1 start:" + message);
    }
  },
  {
    start: (message: string) => {
      hookApplyResult.push(message + " 2");
      console.log("plugin2 start:" + message);
    }
  }
];
const asyncHookPlugins = [
  {
    start: (message: string) => {
      asyncHookApplyResult.push(message + " 1");
      console.log("async plugin1 start:" + message);
    }
  },
  {
    start: (message: string) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          asyncHookApplyResult.push(message + " 2");
          console.log("async plugin2 start:" + message);
          resolve();
        });
      });
    }
  },
  {
    start: (message: string) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          asyncHookApplyResult.push(message + " 3");
          console.log("async plugin3 start:" + message);
          resolve();
        });
      });
    }
  }
];

test("hook", () => {
  hook = new Hook();
});

test("hook plugin", () => {
  if (hook) {
    hook && hook.plugin(hookPlugins[0]);
    expect(hook.plugins.length == 1);
    hook && hook.plugin(hookPlugins[1]);
    expect(hook.plugins.length == 2);
  }
});

test("hook apply", () => {
  if (hook) {
    const data = "hook apply";
    hook.apply("start", data);
    expect(hookApplyResult.length).toBe(2);
    expect(hookApplyResult.join(",")).toBe(`${data} 1,${data} 2`);
  }
});

test("async hook", () => {
  asyncHook = new AsyncHook();
});

test("async hook plugin", () => {
  if (asyncHook) {
    asyncHook && asyncHook.plugin(asyncHookPlugins[0]);
    expect(asyncHook.plugins.length == 1);
    asyncHook && asyncHook.plugin(asyncHookPlugins[1]);
    expect(asyncHook.plugins.length == 2);
    asyncHook && asyncHook.plugin(asyncHookPlugins[2]);
    expect(asyncHook.plugins.length == 3);
  }
});

test("async hook apply", () => {
  if (asyncHook) {
    const data = "hook apply";
    asyncHook.apply("start", data, () => {
      expect(asyncHookApplyResult.length).toBe(3);
      expect(asyncHookApplyResult.join(",")).toBe(
        asyncHookApplyResult
          .map((d, index) => {
            return data + " " + ++index;
          })
          .join(",")
      );
    });
  }
});

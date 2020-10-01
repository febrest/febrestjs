'use strict';

export interface HookPlugin {
  [hook: string]: (data: any) => any;
}
class Hook {
  plugins: Partial<HookPlugin>[] = [];

  apply<T>(hook: string, data?: T) {
    this.plugins.forEach(plugin => {
      if (plugin[hook]) {
        // @ts-ignore
        data = plugin[hook](data) || data;
      }
    });
  }
  plugin(plugin: Partial<HookPlugin>) {
    this.plugins.push(plugin);
  }
}

export default Hook;

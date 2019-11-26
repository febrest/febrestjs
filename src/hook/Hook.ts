"use strict";

export interface HookPlugin {
  [hook: string]: (data: any) => any;
}
class Hook {
  plugins: HookPlugin[] = [];

  apply(hook: string, data: any) {
    this.plugins.forEach(plugin => {
      if (plugin[hook]) {
        plugin[hook](data);
      }
    });
  }
  plugin(plugin: HookPlugin) {
    this.plugins.push(plugin);
  }
}

export default Hook;

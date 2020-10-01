'use strict';

export interface HookPlugin {
  [hook: string]: (data: any) => any;
}
class Hook {
  plugins: HookPlugin[] = [];

  apply<T>(hook: string, data?: T) {
    this.plugins.forEach((plugin) => {
      if (plugin[hook]) {
        data = plugin[hook](data);
      }
    });
  }
  plugin(plugin: HookPlugin) {
    this.plugins.push(plugin);
  }
}

export default Hook;

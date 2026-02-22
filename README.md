# FebrestJS

一个基于状态管理和事件驱动的前端应用框架

## 项目结构

FebrestJS 使用 pnpm 工作区进行组织，具有以下结构：

```
febrestjs/
├── packages/
│   └── core/              # 核心库
│       ├── src/            # 源代码
│       ├── __tests__/      # 测试文件
│       ├── types/          # TypeScript 类型定义
│       └── package.json
├── examples/               # 示例应用
│   ├── lottery/           # 模拟抽奖应用
│   └── todomvc/           # TodoMVC 示例
├── scripts/               # 构建脚本
└── package.json           # 工作区配置
```

## 安装与使用

### 安装依赖

```bash
npm install -g pnpm       # 安装 pnpm（如果尚未安装）
pnpm install               # 安装项目依赖
```

### 开发与构建

```bash
# 构建核心库
pnpm run build

# 运行测试
pnpm run test

# 代码格式化
pnpm run format:fix

# 运行 Biome 检查
pnpm run lint
```

- [Features](#features)
- [Demo](#demo)
- [Usage](#usage)
- [API Reference](#api-reference)

## Features

## Demo

- [lottory](/examples/lottery):模拟抽奖应用
- [todomvc](/examples/todomvc):todo mvc demo

## Usage

Install with npm:

```
npm i febrest -S
```

Install with yarn

```
yarn add febrest
```

## API Reference

- [dispatch](#dispatch)
- [action](#action)
- [plugin](#plugin)
- [State](#state)
- [subscribe](#subscribe)
- [unsubscribe](#unsubscribe)
- [broadcast](#broadcast)
- [observe](#observe)
- [onError](#on-error)

### dispatch

```
dispatch(action:string|(payload?:any)=>any,payload?:any)=>Promise<any>
```

example:

```
dispatch(d=>{console.log(d);return d;},'hello world').then(data=>{console.log(data)})
```

### action

```
action(namespace?:string,controllerMap:<string,(payload:any)=>any>{});
```

example

```
let controller = {
    init:()=>console.log('appinit')
}
Febrest.action('app',controller)
Febrest.dispatch('app.init')
// or
Febrest.action(controller)
Febrest.dispatch('init')

```

### plugin

```

plugin(plugin:{initialized:(action)=>any,close:(action)=>any});

```

### subscribe

```

subscribe(callback:(data:{cmd:string,data:any})=>any);

```

### unsubscribe

```

unsubscribe(callback:(data:{cmd:string,data:any})=>any);

```

### observe

```

watch(callback:(changed)=>{remove:()=>void});

```

### onError

```

onError(callback:(error)=>any);

```

## version

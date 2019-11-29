# febrestjs

febrestjs

- [features](#features)
- [demo](#demo)
- [usage](#usage)
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

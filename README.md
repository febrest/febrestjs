# febrestjs
febrestjs


* [features](#features)
* [demo](#demo)
* [usage](#usage)
* [API Reference](#api-reference)


## Features

## Demo

* [lottory](/examples/lottery):模拟抽奖应用
* [todomvc](/examples/todomvc):todo mvc demo

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

* [dispatch](#dispatch)
* [action](#action)
* [provider](#provider)
* [Provider](#provider)
* [plugin](#plugin)
* [query](#query)
* [update](#update)
* [subscribe](#subscribe)
* [unsubscribe](#unsubscribe)
* [watch](#watch)
* [unwatch](#un-watch)
* [onError](#on-error)

### dispatch


```
dispatch(action:String,payload?:any)
```
example:
```
Febrest.dispatch(ACTIONS.APP_INIT).then(data=>{})
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

### provider
```
provider(providerConfigs:ProviderConfig|Array<ProviderConfig>);
```

```
### plugin

```
plugin(plugin:{initialized:(action)=>any,close:(action)=>any});
```
### Provider


### subscribe

```
subscribe(callback:(data:{cmd:string,data:any})=>any);
```
### unsubscribe
```
unsubscribe(callback:(data:{cmd:string,data:any})=>any);
```
### watch
```
watch(callback:(changed)=>any);
```
### unWatch
```
unWatch(callback:(changed)=>any);
```
### onError

```
onError(callback:(error)=>any);
```

## version change log
[change log](/CHANGELOG.md)

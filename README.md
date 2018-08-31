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
* [registerAction](#register-action)
* [registerState](#register-state)
* [registerProvider](#register-provider)
* [registerService](#register-service)
* [plugin](#plugin)
* [Provider](#provider)
* [query](#query)
* [update](#update)
* [subscribe](#subscribe)
* [unsubscribe](#unsubscribe)
* [watch](#watch)
* [unwatch](#unwatch)
* [onError](#onError)

### dispatch


```
dispatch(action:String,payload?:any)
```
example:
```
febrest.dispatch(ACTIONS.APP_INIT)
```

### registerAction
```
registerAction(actionConfigs:ActionConfig|Array<ActionConfig>);
```
### ActionConfig 

* name:String;
* controller: Function;

example
```
let actionConfig = {
    name:'APP_INIT',
    controller:()=>console.log('appinit')
}
febrest.createActions(actionConfig)
```
### registerState
```
registerState(stateConfigs:StateConfig|Array<StateConfig>);
```
### registerProvider
```
registerProvider(actionConfigs:ProviderConfig|Array<ProviderConfig>);
```
### registerService
```
registerService(actionConfigs:ServiceConfig|Array<ServiceConfig>);
```
### plugin

```
plugin(plugin:{initialized:(action)=>any,close:(action)=>any});
```
### Provider

### setProviderStorageTool

```
setProviderStorageTool({
    setter:(name,value)=>any,
    getter:(name)=>any
});
```
### injectProvider
```
injectProvider(config:ProviderConfig|Array<Provider>);
```
### useProvider

```
use(type:String,provider:Provider);
```
### subscribe

```
subscribe(callback:(data:{state:any,name:string})=>any);
```
### unsubscribe
```
unsubscribe(callback:(data:{state:any,name:string})=>any);
```
### watch
```
watch(callback:(changed)=>any);
```
### removeWatcher
```
removeWatcher(callback:(changed)=>any);
```
### onError

```
onError(callback:(error)=>any);
```

## version change log
[change log](/CHANGELOG.md)

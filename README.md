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
* [createActions](#createActions)
* [applyMiddleWare](#applyMiddleWare)
* [Provider](#provider)
* [injectProvider](#injectProvider)
* [useProvider](#useProvider)
* [subscribe](#subscribe)
* [unsubscribe](#unsubscribe)
* [watch](#watch)
* [onError](#onError)

### dispatch


```
dispatch(action:String,payload?:any)
```
example:
```
febrest.dispatch(ACTIONS.APP_INIT)
```

### createActions
```
createActions(actionConfigs:ActionConfig|Array<ActionConfig>);
```
### ActionConfig 

* key:String;
* controller: Function;
* persist:Object,(waring :maybe remove);

example
```
let actionConfig = {
    key:'APP_INIT',
    controller:()=>console.log('appinit')
}
febrest.createActions(actionConfig)
```

### applyMiddleWare
waring:maybe change

```
applyMiddleWare(middleWare:(exec)=>exec);
```
### Provider


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
subscribe(callback:(data:{state:any,key:string})=>any);
```
### unsubscribe
```
unsubscribe(callback:(data:{state:any,key:string})=>any);
```
### watch
```
watch(providers:Array<String>,callback:(changed)=>any);
```
### onError

```
onError(callback:(error)=>any);
```

## version change log
[change log](/CHANGELOG.md)

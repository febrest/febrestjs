# change log

## 0.3.0beta
* 重写action模块
* 加入服务模块，把payload修改为服务方式传递，增加persist和connect模块，分别用于provider更新和controller单项传递数据，移除action配置中的persist选项。
* 移除action配置中provider选项，action中只保留key和controller选项。
* 暴露removerWatcher方法。

## 0.3.1beta
* 修改watch模块。
* 修改observer模块。

## 0.3.2beta
* 修改connect在actionExec结束之后执行。

## 0.3.3beta
* 修改connect bug。

## 0.4.0beta
* 移除StorageProvider和RemoteProvider，
* service添加dynamic,用来动态获取provider
## 0.5.0beta
* dynamic参数规则修改。
* 重写action模块。
## 0.5.1beta
* runtimeAction bug修复。

## 0.5.2beta
* dynamic bug修复。

## 0.6.1beta
* error模块重写。
* 依赖查找过程重写。
* bug修复。

## 0.6.2beta
* 修复dynamic error无法catch的bug。

## 0.7.1beta(未发布)
* 修改action在persist之后再响应。
* 修改persist逻辑，错误抛出异常。
* Provider支持加锁操作。
* perist的过程中会给Provider加锁。
* 修改Provider，支持简单的对象方式传递扩展。
* 现在开始允许Provider可以返回一个方法给controller去取值，但是尽量不要暴露直接修改Provider的方法出去，这样会导致Provider被修改的时候无法watch。
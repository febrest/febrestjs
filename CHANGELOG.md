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

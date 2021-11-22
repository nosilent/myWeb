### app.use()
插件必须是一个**函数**或者是带有**install**方法的一个对象。源码：
```ts
const installedPlugins = new Set()
const app: App = (context.app = {
  use(plugin: Plugin, ...options: any[]) {
    if (installedPlugins.has(plugin)) {
      __DEV__ && warn(`Plugin has already been applied to target app.`)
    } else if (plugin && isFunction(plugin.install)) {
      installedPlugins.add(plugin)
      plugin.install(app, ...options)
    } else if (isFunction(plugin)) {
      installedPlugins.add(plugin)
      plugin(app, ...options)
    } else if (__DEV__) {
      warn(
        `A plugin must either be a function or an object with an "install" ` +
          `function.`
      )
    }
    return app
  }
```
插件注册时，会将该插件添加到`Set`中，并调用插件函数（插件本身或install方法）传入**app**实例和其他参数。

---
layout: post
title: 再次从零开始捣鼓一个Electron应用——项目配置
date: 2021-04-23 21:28:26
categories: 体验Electron
tags: [electron, node]
reference:
  - url: https://github.com/paulmillr/chokidar/issues/1000
    title: Cannot build project due to fsevents with Electron app on Mac
  - url: https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#preload-files
    title: Guide | Vue CLI Plugin Electron Builder
---

上一篇介绍如何从新搭建了一个项目，本篇重点说明一下在开发过程中遇到的一些问题，以及如何解决。鲁迅曾说过，世界上没有两个相同的程序。本系列也不会介绍代码如何编写，只是将开发过程中遇到的重点的问题记录一下，避免以后出现相同的问题。

<!-- more -->

# Vue Devtools 无法使用（未解决）

安装DevTools的代码在 `background.ts` 文件中，`installExtension()` 方法会尝试从应用商店下载插件。但是由于已知原因，经常无法下载，导致无法正常安装调试插件。

```javascript
if (isDevelopment && !process.env.IS_TEST) {
  // Install Vue Devtools
  try {
    // await session.defaultSession.loadExtension(path.join(__dirname, '../vue-devtools'))
    await installExtension(VUEJS_DEVTOOLS)
  } catch (e) {
    console.error('Vue Devtools failed to install:', e.toString())
  }
}
```

尝试过将插件解压到本地进行加载的方式，也无法使用。最终只有将上述代码注释掉。

# 进程通信

在electron中分为 `渲染进程` 和 `主进程` 。渲染进程负责展示界面，有着跟浏览器一样的沙盒系统，无法直接接触原生资源。主进程负责操作原生数据，启动渲染进程展示界面。这两个进程之间通常需要传输数据。

一般方法可以在渲染进程中使用`require('electron').remote`获取到主进程对象，从而直接操作方法同步获取数据。但是这种方法有安全问题，现在已经默认关闭不推荐使用，打开需要在`background.ts`文件中创建Window的时候指定参数打开：

```javascript
mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true, // 增加这个配置，打开remote对象
    },
  });
```

现在比较推荐的方法是使用ipc进行通信，主进程和渲染进程之间通过事件传递信息操作数据。

```javascript
// 主进程中
const ipcMain = require('electron').ipcMain;
// 注册事件
ipcMain.on('async-event', function(event, payload) {
  console.log(payload);
  event.sender.send('async-response', 'world'); // 回应异步消息
});

ipcMain.on('sync-event', function(event, payload) {
  console.log(arg);
  event.returnValue = 'world'; // 回应同步消息
});
```

```javascript
// 渲染进程
const ipcRenderer = require('electron').ipcRenderer;
console.log(ipcRenderer.sendSync('sync-event', 'hello')); // 同步消息
// 注册事件
ipcRenderer.on('async-response', function(event, payload) { // 异步回应事件
  console.log(payload);
});
ipcRenderer.send('async-event', 'hello'); // 异步消息
```

使用事件的好处是可以分离主进程和渲染进程之间的逻辑，而无需关注真正的代码和方法名称。

# ipc通信的精简

electron一般只需要存在主进程中，但是上面的方法在使用`require('electron')`的时候，会将整个electron模块引入到渲染进程中，而在渲染进程中往往只需要访问 `ipcRenderer` 即可。

可以使用一个前置脚本 `preload.ts` 将 `ipcRenderer` 导出并挂载到window对象里。

{% codeblock lang:javascript preload.ts %}
import { ipcRenderer } from 'electron'

window.ipcRenderer = ipcRenderer
{% endcodeblock %}

然后在vue.config.js文件里挂载preload脚本：

```javascript
{
  // ...
  pluginOptions: {
    electronBuilder: {
      preload: resolve('src/preload.ts')
    }
  }
  // ...
}
```

在background.ts脚本中也要指定preload脚本：

```javascript
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {

      // Required for Spectron testing
      enableRemoteModule: true,

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      preload: path.join(__dirname, 'preload.js') // 指定preload.js脚本
    }
  })
```

如果你使用的typescript，还需要在window对象上补充声明ipcRenderer的类型。

{% codeblock lang:typescript global-window.d.ts %}
import { IpcRenderer } from 'electron'

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }
}
{% endcodeblock %}

# 无法编译本地模块

如果项目依赖的包包含了操作系统相关的本地绑定模块（如fsevents.node），那么在构建打包的时候会出现以下异常：

```shell
error  in ./node_modules/fsevents/fsevents.node

Module parse failed: Unexpected character '�' (1:0)
```

这是因为打包构建的时候没有找打合适的处理器来处理.node后缀的文件，但事实上这类文件本身不需要处理。就可以通过vue.config.js配置项，将这类模块进行排除。

```javascript
// vue.config.js
module.exports = {
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: ['chokidar', 'fs', 'hexo-fs'],
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ['../../node_modules', './node_modules']
    }
  }
}
```

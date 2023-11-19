---
layout: post
title: 体验Electron之Hello World
date: '2016-02-19 22:33:00'
categories:
  - 体验Electron
tags:
  - electron
  - nodejs
---

从Electron简单起步之后，接下来应该就是写Hello World了。但是Hello World已经包含在Quick Start程序里了，怎么办呢？

所以接下来先来看一看Quick Start中的Hello World是怎么写的吧。

# electron-quick-start

首先进入Quick Start的文件夹，可以发现其中包含了以下文件：

```
index.html
LICENSE.md
main.js
node_modules/
package.json
README.md
```

其中有三类文件：程序资源文件（index.html，main.js），说明文件（LICENSE.md，README.md），Node文件（node_modules/，package.json）。在这里我们只关心程序资源文件。

index.html文件中包含程序的主体架构

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

通过源代码可以看出index.html就是一个平常的HTML文件。需要关注的是`<script>`标签里的脚本，通过这些脚本输出了一些常量。

如果把index.html比作视图框架，那么main.js中的就是程序逻辑了

```js
'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
```

程序的逻辑体现在`createWindow`函数中，首先创建了一个800*600的窗体，然后加载资源文件index.html，打开控制台工具，注册closed事件。虽然代码使用了Node的形式编写，但是比对注释大体还是能明白个所以然。

通过官方的Quick Start程序，可以大致了解Electron程序的流程形式。但要想编写复杂Electron程序，这些还远远不够。

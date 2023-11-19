---
layout: post
title: 再次从零开始捣鼓一个Electron应用——使用electron-builder
date: 2021-04-22 23:05:51
categories: 体验Electron
tags: [electron, vue, vue-cli, electron-builder]
reference:
  - url: https://blog.csdn.net/etherealsymbol/article/details/107403317
    title: Electron+vue-cli3开发跨平台桌面应用
---

自从17年接触过electron后，不知过了多久就弃坑，实在想不到会重起这个系列。

先说一下重起的原因，Github会扫描仓库中使用的npm包的版本，如果发现使用了含有漏洞的版本会给出提示，需要进行升级。于是就尝试升级了一下老项目的版本依赖，在升级到最新版本之后，很自然的项目跑不起来了。

考虑到一个一个的适配版本太麻烦，而且当时使用的一些内容也过时了，所以想着不如推倒再次从零开始捣鼓一个Electron应用。希望这次能够顺利按照思路走下去，不要再无缘无故鸽了。

# 新建的思路

要新建一个electron项目，按照3年前的思路是，首先新建一个空白的electron工程，然后想办法在渲染层引入vue进行构建。

最近发现另一个思路，基于electron-builder可以在现有的vue项目上，增加electron的测试、调试和构建功能。

然后我们就按照这次的思路走下去。

# 新建一个Vue3项目

本次我们使用的是最新的Vue3作为基础，需要先检查一下目前的vue-cli版本。

```shell
> vue -V
< @vue/cli 4.5.10
```

截止目前我的vue-cli版本是4.5.10，低版本可能无法正常创建vue项目。

创建Vue项目vue-cli提供了两种方式，命令行交互方式和网页方式。这里使用命令行交互方式：

```shell
> vue create electron-vue-demo
```

接下来的各种选项也不进行详细说明了，根据自身的需要选择。最后vue-cli会创建默认项目并尝试安装依赖。

到达这一步的时候，使用启动命令，就能看到默认的vue页面了。

```shell
> yarn run serve
```

# 增加electron-builder构建

electron-builder 是一个vue-cli插件，帮助我们在原来的vue-cli基础上增加electron打包功能。

在项目的目录里执行：

```shell
vue add electron-builder
```

选择electron版本后等待安装完成。

electron-builder 会在原有项目里增加一些内容：

+ 默认测试方法
+ 主进程启动方法
+ vue.config.js相关配置

# 基本操作

在上面的一系列操作之后，一个简单的electron+Vue构建的项目就完成了。electron-builder已经在package.json中注入了一部分操作，可以使用这些命令进行本地的调试工作。

```shell
# 以本地调试的方式启动
yarn run electron:serve

# 构建成品
yarn run electron:build
```

现在项目已经重新搭建完毕了，可以再次愉快的编码了。

---
layout: post
title: 使用electron-vue搭建脚手架
date: '2017-06-17 23:51:25'
categories:
  - 体验Electron
tags:
  - electron
  - vue
reference:
  - url: 'https://github.com/SimulatedGREG/electron-vue'
    title: SimulatedGREG/electron-vue
---

是的，最近无聊，打算开个新坑，想用Electron做点东西。涉及前端的东西总是有好多选择，也就有好多组合。

使用Electron，可以使用原生的js写，也可以用babel加点新特性什么。听说可以用React，但是被我否决了，没有基础熟悉起来太麻烦。考虑最近用了Vue，决定尝试一些Vue2什么的。

查了一些资料，用[SimulatedGREG/electron-vue](https://github.com/SimulatedGREG/electron-vue)可以作为初始的一个脚手架。

根据文档一步一步做下来就好：

```shell
# Install vue-cli and scaffold boilerplate
npm install -g vue-cli
vue init simulatedgreg/electron-vue my-project

# Install dependencies and run your app
cd my-project
yarn # or npm install
yarn run dev # or npm run dev
```

没有 `yarn` 命令可以通过 `npm install yarn -g` 安装。

首先找目录创建一个项目，出现的信息随便选了选，也不知道这些工具都是干啥的。。。

```
$ vue init simulatedgreg/electron-vue markdown-yaml-info-manager

? Application Name (markdown-yaml-info-manager)
? Application Name markdown-yaml-info-manager
? Project description (An electron-vue project)
? Project description An electron-vue project
? Select which Vue plugins to install (Press <space> to select)
? Select which Vue plugins to install axios, vue-electron, vue-router, vuex
? Use linting with ESLint? (Y/n) y
? Use linting with ESLint? Yes
? Which eslint config would you like to use? (Use arrow keys)
? Which eslint config would you like to use? Standard
? Setup unit testing with Karma + Mocha? (Y/n) n
? Setup unit testing with Karma + Mocha? No
? Setup end-to-end testing with Spectron + Mocha? (Y/n) n
? Setup end-to-end testing with Spectron + Mocha? No
? What build tool would you like to use? (Use arrow keys)
? What build tool would you like to use? builder
? author (sumy <sunmingjian8@gmail.com>)
? author sumy <sunmingjian8@gmail.com>

   vue-cli · Generated "markdown-yaml-info-manager".

---

All set. Welcome to your new electron-vue project!

Make sure to check out the documentation for this boilerplate at
https://simulatedgreg.gitbooks.io/electron-vue/content/.

Next Steps:

  $ cd markdown-yaml-info-manager
  $ yarn (or `npm install`)
  $ yarn run dev (or `npm run dev`)
```

最后的步骤使用 `npm install` 的时候报错了，安装和使用 `yarn` 就没出现报错的问题。之后运行 `yarn` 和 `yarn run dev` 出来如下界面：

{% asset_img 1.png 测试 %}

感觉还不错，也支持修改自动加载啥的。。。本来还想试试sass，结果不太懂，还是放弃吧，就这样开坑挺好的:joy:。。。
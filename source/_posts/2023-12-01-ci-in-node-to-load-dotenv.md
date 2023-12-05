---
layout: post
title: 在Node中使用dotenv加载环境变量
date: 2023-12-01 22:00:00
categories: [果然还是前端]
tags: [node, dotenv, webpack, rspack]
---

# 在Node中使用dotenv加载环境变量

一份代码往往需要部署到不同环境中（开发环境、预览环境、正式环境），它们的一些地方有细微差别。通过环境变量可以定义不同环境使用的值，
比如开发环境的接口地址是 `http://localhost:8080`，而正式环境的接口地址是 `https://api.example.com`。

在 bundle 构建的时候，可以通过 webpack 的 DefinePlugin 来定义环境变量，这样在代码中就可以通过 `process.env` 来访问这些环境变量了。
将不同的 webpack 配置使用 webpack-merge 进行合并，由此达到多环境配置的目的。

但是最好的方法还是建议使用dotenv加载，这里参考 [vite 的方式](https://cn.vitejs.dev/guide/env-and-mode.html)，
根据环境变量加载不同的 dotenv 。 以下对该段代码进行了简化：

https://gist.github.com/sumy7/2a1175947d831a4eee9e8cfb2df51686

<iframe
width="100%"
height="1515"
src="data:text/html;charset=utf-8,
<head><base target='_blank' /></head>
<body><script src='https://gist.github.com/sumy7/2a1175947d831a4eee9e8cfb2df51686.js'></script>
</body>"></iframe>

将方法返回的值传给 webpack 的 DefinePlugin 即可。注意不能直接导出 process.env 到客户端，其中可能包含敏感信息。

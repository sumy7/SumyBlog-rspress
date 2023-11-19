---
layout: post
title: Hexo MathJax插件
date: '2015-10-17 20:25:12'
categories:
  - 实验室
tags:
  - 网站
  - hexo
  - mathjax
description: 使用MathJax让Hexo博客支持数学公式。
reference:
  - url: 'http://catx.me/2014/03/09/hexo-mathjax-plugin/'
    title: Hexo MathJax插件
  - url: 'https://github.com/akfish/hexo-math'
    title: hexo-math - Github
---

本来不打算为网站添加数学公式功能的，不过今天偶然看到了，发现添加比较简单，就尝试了一下。

# 安装

在hexo博客的目录里执行

```bash
$ npm install hexo-math --save
```

# 使用

## 普通的行内公式

```
Simple inline $a = b + c$.
```

效果：

Simple inline $a = b + c$.

## 普通公式块

```
$$\frac{\partial u}{\partial t}
= h^2 \left( \frac{\partial^2 u}{\partial x^2} +
\frac{\partial^2 u}{\partial y^2} +
\frac{\partial^2 u}{\partial z^2}\right)$$
```

效果：
$$\frac{\partial u}{\partial t}
= h^2 \left( \frac{\partial^2 u}{\partial x^2} +
\frac{\partial^2 u}{\partial y^2} +
\frac{\partial^2 u}{\partial z^2}\right)$$

## 标签行内公式

```
This equation {% math %} \cos 2\theta = \cos^2 \theta - \sin^2 \theta =  2 \cos^2 \theta - 1 {% endmath %} is inline.
```

效果：
This equation $ \cos 2\theta = \cos^2 \theta - \sin^2 \theta =  2 \cos^2 \theta - 1 $ is inline.

## 标签公式块

```
{% math %}
\begin{aligned}
\dot{x} & = \sigma(y-x) \\
\dot{y} & = \rho x - y - xz \\
\dot{z} & = -\beta z + xy
\end{aligned}
{% endmath %}
```

效果：

$$
\begin{aligned}
\dot{x} & = \sigma(y-x) \\
\dot{y} & = \rho x - y - xz \\
\dot{z} & = -\beta z + xy
\end{aligned}
$$

# 2018年6月6日更新

由于 **hexo-math** 使用了 **hexo-inject** 进行latex相关解析库的javascript注入，但是在新版的hexo中hexo-inject对其支持不好，因此该方法会出现一些问题。

现在本文改为使用 **hexo-renderer-markdown-it-plus** 配合 **markdown-it-katex** 进行latex公式的渲染。

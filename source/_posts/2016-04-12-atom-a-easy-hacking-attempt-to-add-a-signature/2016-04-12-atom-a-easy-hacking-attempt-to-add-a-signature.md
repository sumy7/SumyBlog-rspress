---
layout: post
title: 在atom的界面上添加署名标识
date: '2016-04-12 20:15:10'
categories:
  - JustForFun
tags:
  - atom
  - css
---

用了一段时间的Atom编辑器了，感觉很不错。Atom通过CSS控制显示的样式，所以一些效果可以通过修改内置的CSS样式来实现。

打开 `File->Stylesheet...` 就可以看到编辑器内置的样式，当然默认里面什么都没有填写。

想要在右上角显示一个签名，或者一句话也可以。由于无法使用JS创建新的div，所以考虑了一下使用了body的 `:before` 伪类来充当显示的容器。

样式如下：

```css
body:before{
    content:"Sumy专用";
    position: fixed;
    right: 10px;
    top: 5px;
    color: #fff;
    z-index: 100;
}
```

保存之后就可以看到效果了。

{% asset_img 1.jpg 简单自定义的atom %}

:joy: 感觉完全没啥用，高兴就好。。。等以后有更好的姿势可以再弄的好看一点 :shit: 。。。

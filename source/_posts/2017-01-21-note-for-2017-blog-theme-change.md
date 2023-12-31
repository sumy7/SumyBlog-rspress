---
layout: post
title: 2017年博客主题更换
date: '2017-01-21 23:46:22'
categories:
  - 网站
tags:
  - 模板
  - 主题
---

# 2017年博客主题更换

放弃了自己制作主题，转而使用修改他人的主题。在主题选择上总是比较纠结：一方面对自己前端水平的无奈，另一方面又想有个性。这次选择了 `maupassant` 作为样板主题，打算进行一些修改，尽最大努力保留上一个版本主题的内容。

## 评论

这次的主题兼容 **多说** 评论，但是有点无奈的是主题修改了文章字符串，这就导致以前的评论无法转移过来，尝试过要修改评论字符串，但是由于改动的地方还是比较多，所以以前的评论啥的还是放弃吧。

考虑要不要转到 **disqus** 评论。之后再探讨这个问题吧。

补充：  
决定迁移到 **disqus** 了，找到一个 **duoshuo** 转 **disqus** 的工具[duoshuo-migrate-to-disqus](https://github.com/barretlee/duoshuo-migrate-to-disqus)，尝试了一下。

## 看一看 秀一秀

**看一看** 用于记录自己看过的一些动漫，**秀一秀** 记录博客用过的主题banner。

看一看 可以很好的移植过来，但是由于现主题没有进度条样式，所以这部分还需要单独处理。

秀一秀 问题有两个：首先是在新页面如何进行显示，然后就是今后博客主题应该如何进行展示。

当前这两个板块存在比较多的问题，需要考虑如何更好的融入当前主题。

## 画廊

画廊是在原文章基础上增加显示图片的地方，起初想法是将一个主题的图片整合起来并写点说明性的内容。但实际看来应用的场景并不是很多，暂时先考虑保留下来。

## 样式

主页文章预览样式，去除了网页样式只保留了文字，当时看到

文章正文中 *标题样式* 与 主标题 样式有点冲，需要协调一下。

## 文章附件

原主题中对文章做了很多的扩展。总结性描述，文章目录，参考文献，这些都是需要展示的内容。

总结性描述：  
总结性描述是提取yaml的description部分显示，在文章前面加一个div然后填入description的内容。

文章目录：  
发现现主题已经包含了文章目录，但是想要显示的话需要单独在md的yaml中启用。看到判断后那就在所有的文章中启用，但是没有目录显得很难看，于是判断有目录才显示。

```
- var toccontent = toc(page.content);
if toccontent.length != 0
    ...
```

重新整合了一下侧边栏，将目录移到新的侧边栏里。

参考文献：  
在文章末尾根据yaml声明的参考文献内容绘制ul进行显示。

## Footer Header

现主题页面底部内容只有版权信息，比较少，打算再增加一些内容。头部考虑添加banner和加载进度条。

## 背景

现主题背景为白色纯背景，可以考虑一下加个背景图片？

## 舍弃

原主题为了好玩加了一个类似于intellij官网的Shell窗口，但是意义不大，现主题决定舍弃掉了。

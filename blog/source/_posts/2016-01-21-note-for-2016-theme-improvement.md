---
layout: post
title: 2016博客模板改进
date: '2016-01-21 21:54:42'
categories:
  - 网站
tags:
  - 模板
  - 主题
---

# 2016博客模板改进

将近年底了，也需要将博客的主题修改一番了。之前一直驾驭不了首页的大横幅，主要是大横幅因为宽度问题总是显示不全。也为了调整这个导致主题的一些模块出现了问题，正好趁着这个时候统一修正一下。

## 顶部加载条

这个在上上个博客主题上曾经使用过，后来主题重写的时候没有带过来。偶然间在逛其它博客的时候发现了这个，于是心中燃起了**希望**，来弄一弄吧。
加载条使用的是[PACE](http://github.hubspot.com/pace/docs/welcome/)这个js库。下载并在模板里引用js和css就可以了，灰常简单。

```html
<script src="//cdn.bootcss.com/pace/1.0.2/pace.min.js"></script>
<link href="//cdn.bootcss.com/pace/1.0.2/themes/pink/pace-theme-flash.css" rel="stylesheet">
```

默认theme提供了不同的加载条样式，也可以用css自定义自己的样式。

## 菜单栏

每页统一起来，将菜单栏统一到了顶部。在Semantic中可以使用[可视化API](http://semantic-ui.com/behaviors/visibility.html)来模拟这种效果。

这里就不做过多介绍了，具体可以参考一些例子和API文档。

菜单栏放到页面中间行为表现正常，但是放到顶部就会出现一些问题，浮动的菜单栏提前加载出来了。找了一个临时解决方案，在页面最上方加上一个高度为1px的div。

## 命令提示符

之前在Intellij官网看到右下角的shell窗口，感觉非常神奇，就想着给博客也弄一个，于是就找到了[JQueryTerminal](http://terminal.jcubic.pl/)这个js插件。

使用非常简单，下载并引入提供的js和css文件即可。提供一个div，调用`$('#term_demo').terminal()`命令就可以得到一个div命令行窗口，具体操作可以查看官网的api文档。

安装之后也没有添加什么特别的效果，就一直扔在那里了，只能当做一个javascript命令解析器。最近想起来就给它增加了一些功能，比如**清屏**、**帮助文档**、**回到顶部**。之后有什么想法再慢慢给它加吧。

如何优雅的展示这个窗口还是一个问题，现在暂时先把它扔在右下角了，但是看起来有点太碍眼了。。。怎么弄才好呢，怎么弄才好呢，怎么弄才好呢。。。

## 首页倒计时

首页banner的位置本来预留出来放一些纪念性的图片，遇到什么大事件可以更换一下，给博客增加些喜气成分。不过总是处理不好尺寸问题，也就渐渐失去了信心了（不会前端硬上的后果，/(ㄒoㄒ)/~），最近在慕课网上看到了一个[Canvas倒计时时钟](http://www.imooc.com/learn/133)的动画，于是拿来用一下吧。想象一下动画做的好的话首页效果还是挺赞的吧，吧？。。。 ~~脑洞~~ 和 ~~JS~~ 缺一不可。。。

等着吧，倒计时完成之前我会把动画做好的！

## 分页和月份

一直没好好研究研究Hexo的配置文件`_config.yml`，然后就用着默认的，然后博客就出现了一些不和谐的地方，然后该修改修改配置文件了。

分页问题。当时修改了首页的分页，但是分页也影响到 **归档** 、 **标签** 等部分的显示，参考[Hexo分页设置问题](http://starsky.gitcafe.io/2015/05/18/Hexo%E5%88%86%E9%A1%B5%E8%AE%BE%E7%BD%AE%E7%9A%84%E9%97%AE%E9%A2%98/)里面提到的，发现可以单独设置每种类别的分页，于是将归档和标签等分页的数值设置的非常大来间接避免分页的问题。

归档按月份进行了分类，使用了Hexo内置的函数生成归档目录，可以在调用函数的时候配置显示的格式，这里显示了年月`<%- list_archives({format:"YYYY年M月"}) %>`，比以前好多了。还顺便抄了一个list样式，感觉自己萌萌哒~（~~有个表情就好了，感觉很有必要给博客加个表情啥的。。。~~）。。。

## 响应式布局

由于博客使用了 `Semantic UI` 框架，虽然框架在某些特效方面很方便，但是对导航栏的响应式上却没有 `Bootstrap` 那么方便。对于宽屏来说还是希望导航栏能展现尽可能多的项目，而移动端只需要显示主要的内容，其余内容提供二级菜单选项。宽屏使用浮动顶部菜单栏，而移动端在这方面很难处理。多次尝试之后，决定放弃顶部浮动效果，改为固定在页面顶端。

另一部分响应式是页面底部，主要还是处理一下背景图片与文字的关系。经过这次调整，博客页面的整体布局已经统一起来。

## 下一步？

从开始打算写一个博客模板到现在，经历了一段时间了。自己对设计也没有啥感觉，主要还是看其它模板的样式，喜欢的地方就借鉴过来。所以到现在，模板很多地方就会出现不太和谐的地方。

下一步打算继续优化博客的模板，主要两个方向：一个是想精简框架，将不需要的模块去除。另一个是尝试用模块化方式书写博客的css，主要是为了方便的改变博客的风格（主题色）。当然也需要继续优化一些细节，毕竟不是专业的也不知能画出啥样子的瓢。。。
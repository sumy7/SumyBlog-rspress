---
layout: post
title: Markdown说明
date: '2015-12-26 22:09:33'
categories:
  - 高效生活
tags:
  - markdown
reference:
  - url: 'http://blog.600km.xyz/2015/12/14/markdown/'
    title: Markdown入门学习
  - url: 'http://www.jianshu.com/p/4Q3aay'
    title: markdown学习笔记
---

最近也没有好好研究些东西，只好写这些小文章凑凑字数，就当做是一种复习吧。
初识`Markdown`还是在刚刚使用Github的时候，当时候的感觉就是：哇塞，好神奇的东西。如同得到了一个锤子一般，总想把各个东西敲个遍。就这样使用Markdown开始了在Github上的博客之旅。
就简单说一下Markdown的语法标记吧。

# 常用标记

## 标题

标题可以对应html的`<h*>`标签，只要在每行的前面加上`#`即可

```markdown
# 一级标题
## 二级标题
### 三级标题
```

以此类推，共提供了六级标题。
另外也可以在标题下一行加三个以上的`-`或`=`来分别表示二级标题和一级标题

```markdown
一级标题
=======

二级标题
-------
```

## 列表

列表分为有序列表和无序列表，对应html中的`<ol>`和`<ul>`标签。
**有序列表**是在每一行前面加数字和点，顺序无所谓，Markdown引擎会自动排序。

```markdown
1. 列表1
2. 列表2
2. 列表3
1. 列表4
5. 列表5
```

出来的效果如下：

1. 列表1
2. 列表2
2. 列表3
1. 列表4
5. 列表5

**无序列表**是在每一行前面加`+``-``*`，可以混合使用。

```markdown
+ 列表1
- 列表2
* 列表3
+ 列表4
```

效果如下，我比较喜欢使用`+`。

+ 列表1
- 列表2
* 列表3
+ 列表4

当然也可以给列表加**子列表**：

```markdown
+ 1
  + 1.1
  + 1.2
+ 2
```

+ 1
  + 1.1
  + 1.2
+ 2

## 格式

格式有三种，**粗体**、*斜体*、~~删除线~~。
PS: 博客使用了js插件会将斜体解析成着重号。

```markdown
**粗体** *斜体* __粗体__ _斜体_ ~~删除线~~
```

## 引用

引用外部一段文字，可以使用

```markdown
> Hello World!
> > Hello World too!!!
```

> Hello World!
> > Hello World too!!!

## 链接

可以给文字加上超链接，超链接有两种，一种普通，另一种引用

```markdown
[点我没用](#链接)
[点我][1]
[1]:javascript:alert('你好');
```

[点我没用](#链接)
[点我][1]
[1]:javascript:alert('你好');

引用像不像参考文献。。。

## 图片

在链接前面加上叹号就变成图片了。

```markdown
![favicon](/favicon.ico)
![favicon][2]
[2]:/favicon.ico
```

![favicon](/favicon.ico)
![favicon][2]
[2]:/favicon.ico

## 表格

表格这东西太麻烦了，先抄一个简单说一下

```markdown
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

第二行的冒号表示对齐方式，没有冒号或冒号在左边是左对齐，左右都有冒号是居中对齐，右边有冒号是右对齐。

## 分隔线

三个连续的下划线或者星号单独一行就是分割线了。

```markdown
___
***
```

---------分隔条开始----------
___
***

---------分隔条结束----------

# 常用工具

稍微介绍一下Markdown的工具吧。

一般文本编辑器都可以用来写Markdown，但是有的不支持实时预览。我现在用vscode和atom支持实时预览。当然有的神级编辑器装插件就可以了。。。以后写熟悉了基本上用不到实时预览了。
另外可以使用在线的Markdown编辑器，这个一搜有好多。还是推荐一个[Cmd Markdown](https://www.zybuluo.com/mdeditor)吧。

祝写作愉快。
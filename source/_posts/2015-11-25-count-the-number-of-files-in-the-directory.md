---
layout: post
title: linux下统计目录中的文件个数
date: '2015-11-25 23:46:00'
categories:
  - 高效生活
tags:
  - linux
  - shell
---

# linux下统计目录中的文件个数

在linux下使用以下命令可以简单的统计目录下文件的个数。

## 命令

**查看当前目录下文件的个数**

```sh
ls -l | grep "^-" | wc -l
```

**查看当前目录下文件的个数，包括子目录里的。**

```sh
ls -lR| grep "^-" | wc -l
```

**查看某目录下文件夹（目录）的个数，包括子目录里的。**

```sh
ls -lR| grep "^d" | wc -l
```

## 解释

下面解释一下上面的命令：

`ls`可以列出当前目录下的文件，那么`ls -l`是以长格式的形式查看当前目录下所有可见文件的详细属性。

```
$ls　-l
drwxr-xr-x　3　user　group　102　Mar11　22:56　Filename
-rwxr-xr-x  1  user  group  123  Mar11  00:00  Filename1
```

`-R`参数可以递归列出子目录下的文件。

`grep`用来根据正则匹配文本，并将匹配到的文本行显示出来。`"^-"`用来匹配行开始的字符为`-`的那一行，`"^d"`用来匹配行开始字符为`d`的那一行。
从上面可以看出，文件夹的开始会有字母`d`，而普通文件只是简单的`-`。顺便说一下，如果为连接文件，会显示`l`。

`wc`命令用来统计字节数、字数、行数，并将统计结果显示输出。`-l`用来统计行数的。

以上命令串起来，就是（递归）列出所有的目录和文件，找出其中的文件/文件夹的行，统计出行数就是对应的文件/文件夹的个数的。

## 参考内容

+ [linux 统计当前目录下文件数](http://blog.csdn.net/vagabon/article/details/5317156)

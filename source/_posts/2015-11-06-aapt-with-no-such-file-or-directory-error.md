---
layout: post
title: 使用aapt出现No such file or directory错误
date: '2015-11-06 00:17:24'
categories:
  - 工具
tags:
  - aapt
  - linux
  - sdk
  - 解决问题
reference:
  - url: 'http://www.phperz.com/article/14/1212/40796.html'
    title: 64位linux无法运行Android sdk的adb和aapt，提示No such file or directory的错误解决办法
---

在Linux环境下运行aapt的时候出现：

```
bash: ./aapt: No such file or directory
```

开始以为是没有加x权限，然而加了也没有用。
经过查找发现是64位的系统中缺少32位的运行库，安装后就可以使用了。

```
sudo apt-get install lib32stdc++6
```

如果还出现错误`error while loading shared libraries: libz.so`，再执行：

```
sudo apt-get install lib32z1 lib32z1-dev
```

即可运行aapt。

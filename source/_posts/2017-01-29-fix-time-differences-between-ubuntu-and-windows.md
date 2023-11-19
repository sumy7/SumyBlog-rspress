---
layout: post
title: 修正双系统Windows和Ubuntu时间不同步
date: '2017-01-29 17:43:42'
categories:
  - 问题麻烦
tags:
  - windows
  - ubuntu
  - timezone
reference:
  - url: 'https://wiki.archlinux.org/index.php/Time'
    title: Time - ArchWiki
  - url: >-
      http://ubuntuhandbook.org/index.php/2016/05/time-differences-ubuntu-1604-windows-10/
    title: How to Fix Time Differences in Ubuntu 16.04 & Windows 10 Dual Boot
---

每次使用Ubuntu的时候，回到Windows之后时间总会慢8个小时。原因是Ubuntu认为CMOS时间是**格林威治标准时间**，而Windows认为CMOS时间是当地时间，如果当地在+8区，时间相应的就会差8个小时。

之前看过一些解决方法。一种是在Ubuntu下修改配置文件，让系统使用本地时间。另一种是修改Windows的注册表，让系统使用标准时间。不知为什么这两种方法的都没有成功。

最近查找这个问题的时候发现，在**Ubuntu 16.04**之后加入了 `timedatectl` 命令可以修改系统的时区。方法是设置Ubuntu使用当前时区。

```
# timedatectl set-local-rtc 1
```

`timedatectl` 命令还有其它用途就不一一列举了，主要是解决了双系统时间不同步的问题。
---
layout: post
title: Ubuntu中命令行修改屏幕分辨率
date: '2016-12-21 20:09:12'
categories:
  - 问题麻烦
tags:
  - ubuntu
  - 分辨率
  - 问题
---

前几天安装了Ubuntu Kylin 16.10，然后按照[Ubuntu 14.04~15.10 Linux 3D桌面完全教程，显卡驱动安装方法，compiz特效介绍，常见问题解答](http://forum.ubuntu.org.cn/viewtopic.php?p=868051)配置了桌面特效，感觉还不错。但是重启的之后发现屏幕分辨率不太对了，而且最大只有 640x480 分辨率。只有笔记本屏幕的分辨率有问题，连接外接显示器的分辨率还很正常。

不想重装系统了，无奈通过其它手段来修复这个问题吧。

首先在桌面环境下用 `xrandr` 查看当前支持的分辨率。

```
sumy@sumy-lcom:~$ xrandr
Screen 0: minimum 8 x 8, current 640 x 480, maximum 16384 x 16384
eDP-1-1 connected primary 640x480+0+0 309mm x 174mm
   640x480       59.94*  
   320x240       60.05  
VGA-1-1 disconnected
HDMI-1-1 disconnected
```

不知为什么只支持两种分辨率了，要添加一种新的分辨率，需要知道分辨率的各项参数，使用 `cvt` 可以获取一个分辨率的参数。假设是 1920x1080 的。

```
sumy@sumy-lcom:~$ cvt 1920 1080
# 1920x1080 59.96 Hz (CVT 2.07M9) hsync: 67.16 kHz; pclk: 173.00 MHz
Modeline "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync
```

然后添加一个新的显示模式。

```
sumy@sumy-lcom:~$ xrandr --newmode "1920x1080-60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync
```

将新建的分辨率模式添加到显示器上，显示器的名字可以通过之前的 `xrandr` 命令找到。

```
sumy@sumy-lcom:~$ xrandr --addmode eDP-1-1 "1920x1080-60.00"
```

应用新的显示模式

```
sumy@sumy-lcom:~$ xrandr --output eDP-1-1 --mode "1920x1080-60.00"
```

这样显示器的分辨率可以改成需要的了。

每次启动都要修改分辨率很麻烦，可以将上面的命令加到 `~/.profile` 文件中，这样登陆就可以自动修改分辨率了。

```
xrandr --newmode "模式名称" 模式参数
xrandr --addmode 显示器名称 模式名称
xrandr --output 显示器名称 --mode 模式名称
```

还有一个问题，未登录之前的分辨率还是不正常的，不知道有什么方法可以彻底解决这个问题。
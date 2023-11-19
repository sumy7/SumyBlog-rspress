---
layout: post
title: 《创新、严肃、好玩的android应用程序开发》课程笔记①
date: '2013-12-04 00:00:00'
categories:
  - 读书笔记
tags:
  - android
  - coursera
  - 笔记
description: >-
  在 coursra
  上学习《创新、严肃、好玩的android应用程序开发》这门课程，就把课程中重要的东西记录下来。因为是课程笔记，所以只记录了我认为比较有用的东西，也写的比较简练。
reference:
  - title: Android Developers
    url: 'http://developer.android.com/index.html'
---

课程地址：[https://class.coursera.org/androidapps101-001/class](https://class.coursera.org/androidapps101-001/class)

# 安装环境的配置

可以去谷歌的 android 开发者网站 [http://developer.android.com/sdk/index.html](http://developer.android.com/sdk/index.html) 下载。

点击 “Download the SDK”，就会自动下载对应系统的 SDK 。Windows 和 Linux 注意区分系统的位数（32位 或者 64位）。将下载到的压缩文件解压到合适的目录。

SDK 中包含所需要开发模拟器和写代码的程序（eclipse）。

接下来要去 Java 下载 Java SDK 6 ，由于电脑中已经安装，就不再阐述了。

# 使用安卓模拟器

首先在解压出来的文件中找到 SDK Manager 这个程序，然后在其中选择下载需要的 API 版本（android 版本）。在 “Tools” -> “Manage AVDs...” 就可以创建模拟器了。

创建好相应的模拟器启动。

## 模拟器小技巧

### 两个模拟器之间发短信（Message）
启动两个模拟器之后，发现模拟器标题上有类似于端口号的东西（例如：5554），收信人的号码填写这个端口号即可。

### Telnet 的使用

使用 Telnet 可以连接到模拟器。

首先我们了解一下 Telnet 的使用。

使用 Windows 7 或 Windows 8 在命令提示符中可能会提示找不到 telnet 命令，找到 “控制面板” -> “程序和功能” -> “打开或关闭 windows 功能” -> “选中 telnet 客户端” -> “确定”。

连接网站：在命令提示符中输入 `telnet www.baidu.com 80` 回车即可通过 80 端口连接到该网站。随便输入几个字符回车，即可发现网站返回 “400 Bad Request” 的错误提示。

使用命令 `telnet 127.0.0.1 [端口号]` 可以连接到虚拟机。

1. 使用 sms 命令发送短信
输入`sms send 787 Hello Emulator!` 即可想模拟器发送一条来自 787 的短信，内容是 “Hello Emulator!”。

2. 使用 power 来修改电池电量
输入 `power capacity 0` 将电池电量改为 0 。

3. 使用 window 缩放窗口
输入 `window scale 0.5` 将模拟器窗口缩放到原先的二分之一。

4. 使用 avd 控制模拟器
`avd stop` 可以使模拟器停止响应。`avd start` 可以重新恢复。

5. 使用 gsm 电话控制
`gsm call 123456` 可以让模拟器接入一个来自 123456 的电话。`gsm cancel 123456` 来电 123456 主动挂断。

## 快捷键

安卓模拟器快捷键可以参考开发网站上的内容。

> Ctrl + F11 重力旋转
> Ctrl + Enter 全屏

## Inter 模拟加速器

可以在 Android SDK Manager 中下载 Intel x86 Emulator Accelerator (HAXM) 。然后到 `\sdk\extras\intel\Hardware_Accelerated_Execution_Manager` 来安装。需要 CPU 的支持。

# eclipse 的使用

两个工具 “LogCat” 和 “Devices” 。

LogCat 用于捕捉来自模拟器应用进程的日志事件。 Devices 可以对模拟器进行一些控制，包括重启模拟器、对模拟器截图等等。

创建工程 -> 编译 -> 启动模拟器 -> 安装app -> 运行。

删除工程。

---
layout: post
title: 《创新、严肃、好玩的android应用程序开发》课程笔记②
date: '2013-12-07 00:00:00'
categories:
  - 读书笔记
tags:
  - android
  - coursera
  - 笔记
---

# 《创新、严肃、好玩的android应用程序开发》课程笔记②

> 《创新、严肃、好玩的android应用程序开发》第二周的视频放出来了，这次主要将的是安卓程序的创建、运行还有资源布局方面的内容。

课程地址：[https://class.coursera.org/androidapps101-001/class](https://class.coursera.org/androidapps101-001/class)

在练习中看到的一个有意思的事情。

打开 cmd 然后输入 `telnet towel.blinkenlights.nl 23` 就可以在命令提示符中看到用 ASCII 播放星球大战的电影。

## 创建工程

1. 打开 eclipse ，新建一个 android 项目， 【New】 -> 【Project】 -> 【New Android Application...】。
2. 输入 Application Name ， Project Name 和 Package Name。Package Name 应该唯一。
3. 选择 Minimum Required SDK ， Target SDK 和 Compile With。 
4. 可以在向导里创建简单的 ICON 图标，可以使用自定义图片，文字，图形等。
5. 记得创建一个 Blank Activity。

## 手机端

在 Windows 和 Linux 系统下，需要下载 Usb Drivers，可以使用 豌豆荚 等软件代劳。

手机需要打开【开发者模式】才能被电脑进行调试。 4.0 以上的安卓版本，首先在【设置】（Settings）->【关于手机】（About Phone）里面点击【编译版本】（Build number）七次，打开【开发者选项】（Developer options）。在【开发者选项】（Developer options）中将选项设置为【打开】（On）。

可以在【关于手机】中查看手机所使用的 Android 版本。

## 工程运行（调试）

右键点击工程，选择【Run As】->【Android Application】。在运行界面中可以选择是通过真实手机（如果已连接）运行，还是通过模拟器运行。

Android 工程的运行最小版本号（Minimum Required SDK）需小于手机端的版本号，后期我们可以在 AndroidManifest.xml 修改。

> AndroidManifest.xml 包含了组成应用程序的每一个组件(活动、服务、内容提供器和广播接收器)的节点，并使用 Intent 过滤器和权限来确定这些组件之间以及这些组件和其他应用程序是如何交互的。

AndroidManifest.xml 中的 package 代表 android 应用包的名字，android:minSdkVersion 代表最小需要的安卓 API 版本。

修改文件的时候需要注意文件的格式。

## 工程简单修改

在目录结构 res -> layout -> activity_main.xml 下存放着工程的一个默认布局文件。通过修改布局文件可以修改引用改布局文件的 activity 的 UI 显示。

在目录结构 res -> values -> strings.xml 下存放着工程的一个字符串变量文件。一般都会将工程中使用的字符串提取出来放到该文件进行引用，目的是方便管理和国际化的进行。
文件中存在几个转义：

> `&lt;` 代替 `<`
> `&gt;` 代替 `>`
> `&amp;` 代替 `&`
> `\n` 代替 回车换行

向 LogCat 发送信息，可以在代码中使用 Log 类的内容。

> Log.v 黑色，代表 VERBOSE 。
> Log.d 蓝色，代表 DEBUG 。
> Log.i 绿色，代表 INFORMATION 。
> Log.w 橙色，代表 WARING 。
> Log.e 红色，代表 ERROR 。
> Log.wtf 代表非常致命的 FAULT 信息（What  a Terrible Failure）。

在工程中，若不导入相应的包，就需要使用全名来引用包的内容。如上面的命令就需要写成 `android.util.Log.e()`。

## 图片资源的操作

使用 eclipse 中的 File Explorer 视图可以查看连接手机的内部文件，包括系统文件和 SD Card 文件。可以通过方法将文件从手机复制出来然后添加到工程中。

对于在资源管理中的修改， eclipse 并不会自动更新文件目录信息，需要按 F5 或者右键选择【Refresh】来重新加载资源。

要想将资源添加到 android 工程目录中，并被 R 资源文件索引，文件名必须为 a-z，0-9，还有小数点下划线，不能包含其它字符。否则 eclipse 将会给出错误提示。刷新 R 文件可以通过删除 R 文件然后重新生成来实现。

在布局文件中，图片文件可以通过 ImageView 显示到界面上。

图片文件太大会超出 Android 的运行内存，导致异常的发生。 Android 虚拟机为每个安卓 APP 提供了 16MB 的运行空间。

在 Layout 文件中可以定义每个组件的相对关系，包括上下左右相邻。对于 ID ，`@+id`表示添加一个 view id 供使用和索引。文件遵循先定义，后使用的原则。

Properties 视图可以方便的修改各个资源的属性，这比直接修改 Layout 文件方便的多。

## res目录下资源文件夹的命名

资源文件夹通过不同的命名来适应不同的设备场景。 Android 会根据当前模拟器的情况自动寻找相应文件夹下的资源文件。

场景布局资源文件夹。layout 适应与所有的布局场景，layout-land 适应于横屏场景，layout-port 是竖屏场景。

通过不同的命名，使得一个应用可以根据不同的环境来读取不同的配置文件。具体可以参照 Android SDK 说明文档。

## 参考内容

+ [Android Developers](http://developer.android.com/index.html)

---
layout: post
title: Nexus6P解锁bootloader然后刷recovery、root、xposed指导
date: '2015-12-07 20:12:05'
categories:
  - 搞机日常
tags:
  - android
  - 刷机
  - nexus
  - root
reference:
  - url: 'http://bbs.gfan.com/android-8117931-1-1.html'
    title: NEXUS 6P 解锁Bootloder、刷回原生、刷RECOVERY、ROOT、XPOSED教程 - 华为 Nexus 6P 安卓论坛 机锋论坛
  - url: >-
      http://forum.xda-developers.com/nexus-6p/general/guides-how-to-guides-beginners-t3206928
    title: '[GUIDE] Unlock/Root/Flash for Nexus 6P | Huawei Nexus 6P'
---

经过漫长的等待，港版nexus 6p终于到手了，然后赶紧试了试。。。由于手机没有Root，无法恢复软件数据，所以先来折腾一番。
参考的Root教程是[机锋论坛的一个置顶帖](http://bbs.gfan.com/android-8117931-1-1.html)，用的方法是刷修改版的内核。Root效果还是比较理想的。

# 解锁Bootloader

要想刷修改版的内核，需要先解锁Bootloader。
首先去“设置”->“关于手机”点“版本号”7次，开启“开发者选项”。在“开发者选项”中勾选“OEM解锁”。
需要的工具可以去论坛下载。
对于新手还是推荐使用Nexus Root Toolkit工具包，这里就不过多说明了。
如果不想使用工具包还可以使用Android SDK里的adb工具，需要下载最新的Android SDK环境。由于之前搞过Android开发，有SDK环境还是比较方便的。
运行：

```
adb reboot bootloader
```

进入bootloader刷写模式。
然后运行：

```
fastboot flashing unlock
```

解锁bootloader。
以下需要注意的事情：

1. 解锁bootloader会回到出厂模式，注意备份数据
2. 一旦解锁bootloader，就不要再上锁了。看网上相关的介绍说重新上锁有几率成砖，而且需要返回原厂进行修理。虽然不知道为什么，但是为了省掉这个麻烦，还是不要去尝试了。

# 更新系统、刷入Recovery、Root

重启之后，需要更新系统。如果有梯子，可以架梯子从官方更新，否则就下载刷机包手动更新，可以继续参考置顶帖的手动更新说明。这里也不作过多说明。
更新之后版本号变为`MDB08L`。
手机重启到bootloader

```
adb reboot bootloader
```

下载修改的boot文件，刷入：

```
fastboot flash boot 08Mroot-boot.img
```

下载并刷入第三方的recovery，这里使用帖子提供的twrp版本的recovery：

```
fastboot flash recovery twrp-2.8.7.2-angler.img
```

在bootloader模式下按音量键下键两次，可以看到红色的recovery，这时候按电源键可以进入teamwin recovery。
下载supersu文件，放到手机的目录下。
在twrp主界面选择install，找到刚才放入的BETA-SuperSU-v2.52.zip文件，滑动三角开始刷入。
重启。
这样手机就已经root了。

一些说明：
手机自动更新版本变为`MDB08L`，而帖子中提供的boot版本是`MDB08M`，可以刷入吗？我刷入了，没有问题。也在XDA论坛上找到了一些说明。

{% blockquote %}
5.Can I use the modified MDB08K boot.img on other builds?

Yes, the modified MDB08K boot.img can be used with the MDB08K build and all later builds (MDB08L, MDB08M). It cannot be used with the MDA89D build.
{% endblockquote %}

# 安装Xposed

听说Xposed是个很强大的框架。
下载Xposed刷机包和apk安装包，使用recovery将刷机包刷入系统，安装完apk就可以使用了。

由于看了一下简介，暂时对Xposed不太需要，就没有尝试安装。

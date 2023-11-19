---
layout: post
title: 《创新、严肃、好玩的android应用程序开发》课程笔记③
date: '2014-01-09 00:00:00'
categories:
  - 读书笔记
tags:
  - android
  - coursera
  - 笔记
description: >-
  《创新、严肃、好玩的android应用程序开发》第三周的视频，由于课程方那边圣诞放假，于是课程的 Deadline
  就推迟了三周，借这个时间也把手头的事情忙了一下。
reference:
  - title: Android Developers
    url: 'http://developer.android.com/index.html'
---

课程地址：[https://class.coursera.org/androidapps101-001/class](https://class.coursera.org/androidapps101-001/class)

# 视图滚动

当视图内容超出手机屏幕的宽度和高度的时候，为了保证正常显示所有的内容，可以添加一个 ScrollView 来让视图可以滚动，以显示剩余的内容。

视图的宽 `android:layout_width` 和高 `android:layout_height` 有三个属性 `wrap_content` `match_parent` `fill_parent`，作用分别为适应内容、填充父控件、填充父控件，后两个属性在作用上是一致的。

# 程序的发布

安卓程序是一个 APK 格式的类压缩文件，真正要发布的 APK 程序需要签名，而我们测试时候安装到手机中的 APK 被 ADT 默认用了一个 DEBUG 的签名，这样的 APK 程序是不能发布到商店的。

要发布安卓程序，首先在工程上单击右键，选择 Export ，在其中找到 Export Android Application 。首先是选择一个 Keystore 或者新建一个。这里新建一个，需要输入要设定的密码，Key 的名称，确认密码，密钥的有效期，密钥的组织等。密钥创建成功之后，选择要导出 APK 的目录即可导出。

# 程序的安装

相同的包名，但是不同的签名的安卓程序是不能覆盖安装的，需要先卸载之前的版本。

默认情况下，系统设置不允许安装其它来源的 APK 程序，需要在设置中解锁。

在系统中打开 APK 文件，根据提示就可以安装 APK 程序了。

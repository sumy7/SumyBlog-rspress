---
layout: post
title: 通过启动项启用关闭Hyper-V功能
date: '2017-02-12 15:02:21'
categories:
  - 高效生活
tags:
  - windows
  - hyper-v
  - bcdedit
---

# 通过启动项启用关闭Hyper-V功能

俗话说，鱼和熊掌不能兼得。最近在考虑使用Docker for Windows的问题。Docker for Windows使用了Hyper-V的虚拟化技术进行支持，Hyper-V与VirtualBox不能同时使用（同时启动虚拟机会出现“绿屏”）。考虑到Virtualbox在其它方面可能还会用到。一篇文章上可以通过修改 **启动菜单** 启动和关闭Hyper-V的特性。

## 复制菜单项

通过**管理员**权限启动命令提示符。复制当前的启动菜单：

```cmd
C:\WINDOWS\system32>bcdedit /copy {current} /d "No Hyper-V"
已将该项成功复制到 {7c8aaa03-b86b-11e6-9c55-c095c1c59faa}。
```

那一串字符就是新菜单项的标识符，然后为新菜单项关闭hyperv的特性

```cmd
C:\WINDOWS\system32>bcdedit /set {7c8aaa03-b86b-11e6-9c55-c095c1c59faa} hypervisorlaunchtype off
操作成功完成。
```

`{7c8aaa03-b86b-11e6-9c55-c095c1c59faa}` 需要与第一条命令中显示的相对应。

## 使用菜单项

从 Windows 8 开始，一般电脑都启用了 _快速启动_ 的特性，这样虽然加快了启动速度，但却无法方便的选择启动菜单。而且在快速启动模式下，Windows没有真正关机，通过重启可以让Windows真正关机并从新启动。如何使用上面新建的菜单项？

大体步骤是：正常进入系统后，重启选择“No Hyper-V”启动菜单，进入未启用Hyper-V模式。

在选择**重启**计算机之前先<u>**长按Shift**</u>，然后再点击重启菜单

![重启](./1.png)

等待系统进入蓝色屏幕的启动菜单。选择“使用其他操作系统”，接下来选择上面创建的“No Hyper-V”启动菜单。

![启动选项](./2.jpg)

![启动菜单](./3.jpg)

等待系统重启进入系统之后，Hyper-V就被关闭，可以使用Virtualbox了。比如Genymotion模拟器，虚拟机里的操作系统等。

## 参考内容

+ [Switch easily between VirtualBox and Hyper-V with a BCDEdit boot Entry in Windows 8.1 - Scott Hanselman](http://www.hanselman.com/blog/SwitchEasilyBetweenVirtualBoxAndHyperVWithABCDEditBootEntryInWindows81.aspx)

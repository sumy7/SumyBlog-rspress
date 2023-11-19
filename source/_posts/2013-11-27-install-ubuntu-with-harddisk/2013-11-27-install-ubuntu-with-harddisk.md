---
layout: post
title: EasyBCD硬盘安装Ubuntu
date: '2013-11-27 00:00:00'
categories:
  - 服务器与系统
tags:
  - ubuntu
  - linux
  - 装机
description: 前一阵子不小心把Ubuntu搞坏了，进不了系统，于是就打算重装一下。
reference:
  - title: Win7+Ubuntu11.10(EasyBCD硬盘安装) - allenjin
    url: 'http://www.cnblogs.com/allenjin/archive/2011/11/26/2264089.html'
---

用这种方法装 Ubuntu 的好处就是不用刻盘，也不用将 iso 的镜像刻到 U 盘引导中。还是比较方便的。

# 准备

1. 系统分区，这个大约准备 20GB 左右吧，我准备了 50GB ，我就直接用以前的分区了。
2. EasyBCD ，一个 BCD 启动管理软件，我的是 EasyBCD 2.2 ，1.7 以后的版本就可以了。
3. Ubuntu 的 iso 镜像，这个可以到官网下载，我用的是最新的 Ubuntu 14.04 ，推荐使用 13.04 吧，这个看个人喜好了。

# 添加启动菜单

打开 EasyBCD，选择添加新项目（Add New Entry），然后选择 NeoGrub ，点击 安装（Install） 。

{% asset_img 1.png 安装引导 %}

安装之后选择 配置（Configure） ，之后将一下模板内容粘贴到编辑器中，保存。

    # NeoSmart NeoGrub Bootloader Configuration File
    #
    # This is the NeoGrub configuration file, and should be located at C:\NST\menu.lst
    # Please see the EasyBCD Documentation for information on how to create/modify entries:
    # http://neosmart.net/wiki/display/EBCD/

    title Install Ubuntu 14.04
    root (hd0,0)
    kernel (hd0,0)/vmlinuz boot=casper iso-scan/filename=/trusty-desktop-i386.iso ro quiet splash locale=zh_CN.UTF-8
    initrd (hd0,0)/initrd.lz

这里稍微解释一下代码的含义：

> title 是引导菜单的标题
> (hd0,0) 代表第一块硬盘的第一个分区，这个要根据你放的镜像的位置调整。我的默认放到 C 盘下面了
> trusty-desktop-i386.iso 这是你下载的镜像的名称，注意不要写错了
> 注意：只是提供了一个模板，具体还要根据自己的实际情况进行调整。

接下来把 Ubuntu 的光盘镜像 ISO 文件复制到 C 盘的根目录下面。用压缩软件或者虚拟光驱打开，找到 casper 文件夹，复制 initrd.lz 和 vmlinuz 到 C 盘根目录下。
重启电脑。

# 安装 Ubuntu

重启，你就会看到有2个启动菜单，选择 NeoGrub 这个，之后再选择 Install Ubuntu 14.04 这个菜单项。等一段时间之后就可以看到进入了 Ubuntu 的界面。如果出现错误，请好好检查一下那个文件是否正确，复制的文件的目录是否与配置文件中的信息对应起来了。
进入 Ubuntu 界面之后首先按 Ctrl+Alt+T 呼出控制台，输入

    sudo umount -l /isodevice

来取消光盘镜像的挂载。
双击桌面上的图标开始安装 Ubuntu。之下来是部分图片。因为要分区，安装类型选择其它选项。（PS：我在 Ubuntu 下面截的图挂了，只好先盗图用一下了。）

{% asset_img 2.png 安装过程 %}

注意分区的时候要特别小心，如果不太明白的话多去百度一下，数据可是无价的。
挂在分区的方案如下(以30G为例)：

> /    20G  ext4（根分区可以大点）
> SWAP  2G （大约为内存的 2 倍吧）
> /home  8G ext4（剩下的给/home）

{% asset_img 3.png 安装过程 %}

{% asset_img 4.png 安装过程 %}

{% asset_img 5.png 安装过程 %}

安装完成后就可以重启了。

# 后续工作

重启之后会发现多出 GRUB 的引导菜单。
如果不需要再安装了，可以进入 Windows ，打开 EasyBCD 按照开始时候的操作，删除 NeoGrub 即可。然后去 C 盘 删除 vmlinuz，initrd.lz 和 Ubuntu 的 iso 文件。
利用 EasyBCD 可以更改启动项菜单按 Edit Boot Menu 按钮，可以选择将 Windows 设为默认开机选项。不过它对于 Grub 的修改是无效的。

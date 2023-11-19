---
layout: post
title: Ubuntu 下合并分区数据
date: '2016-11-15 23:35:47'
categories:
  - 问题麻烦
tags:
  - ubuntu
  - linux
  - 分区
---

好久没写博客了，最近也不知道在忙些什么，而且期间还生了场大病，好在感觉节奏在慢慢回来，可能吧。

之前系统 Ubuntu 分区根据不同的挂载点，分了不同的分区。随着系统的升级，现在越来越觉得 `/boot` 分区有点力不从心，稍微安装几个内核就满了，于是考虑将 `/boot` 分区合并到 `/` 的分区里。

首先查看一下当前分区及挂载点情况：

```
sumy@sumy-lcom:~$ df -h
文件系统        容量  已用  可用 已用% 挂载点
udev            3.9G     0  3.9G    0% /dev
tmpfs           790M  9.9M  780M    2% /run
/dev/sda7        19G  7.6G   11G   43% /
/dev/sda8        19G  9.2G  8.6G   52% /usr
tmpfs           3.9G   29M  3.9G    1% /dev/shm
tmpfs           5.0M  4.0K  5.0M    1% /run/lock
tmpfs           3.9G     0  3.9G    0% /sys/fs/cgroup
/dev/sdb2        96M   28M   69M   30% /boot/efi
/dev/sda11       55G   34G   19G   65% /opt
/dev/sda12       19G   18G  378M   98% /home
tmpfs           790M  4.0K  790M    1% /run/user/122
tmpfs           790M   28K  790M    1% /run/user/1000
/dev/sda6       181M   71M   98M   42% /boot
```

可以看到 `/boot` 分区位于 `/dev/sda6` 下，而 `/` 位于 `/dev/sda7` 下。一个基本的思路是将 `/boot` 的内容拷贝到 `/` 里，然后修改挂载文件不再自动挂载 `/dev/sda6` 分区。

由于系统开机自动挂载的缘故，所以无法通过根目录直接访问到 `/dev/sda7` 里的 `/boot` 目录，需要自己挂载，才能访问到。

```shell
sumy@sumy-lcom:~$ sudo mkdir /mnt/root
sumy@sumy-lcom:~$ sudo mount -t ext4 /dev/sda7 /mnt/root
```

现在 `/dev/sda7` 被挂载到 `/mnt/root` 目录下，接下来将 `/boot` 的内容拷贝到 `/mnt/root/boot` 目录下，如果没有该目录，记得新建一个目录，并修改权限。

最后，修改系统挂载文件 `/etc/fstab` ，注释掉 `/boot` 挂载点的那一行，这里是 `UUID=c71b9df3-a15a-4fc9-bd31-b4d6d2a44e54 /boot           ext4    defaults        0       2`。

```
sumy@sumy-lcom:~$ cat /etc/fstab 
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/sda7 during installation
UUID=8ab30d20-d0e2-4e2b-9a80-b8dc8f2cfd0d /               ext4    errors=remount-ro 0       1
# /boot was on /dev/sda6 during installation
# UUID=c71b9df3-a15a-4fc9-bd31-b4d6d2a44e54 /boot           ext4    defaults        0       2
# /boot/efi was on /dev/sdb2 during installation
UUID=129B-73E3  /boot/efi       vfat    defaults        0       1
# /home was on /dev/sda12 during installation
UUID=ab1482f1-5c78-428d-8339-d8c1cdaca75c /home           ext4    defaults        0       2
# /opt was on /dev/sda11 during installation
UUID=27ec71d6-2513-472f-8ecf-59e55f8e09be /opt            ext4    defaults        0       2
# /usr was on /dev/sda8 during installation
UUID=f0d67ade-7b7c-42f9-8300-51e77b5b13d2 /usr            ext4    defaults        0       2
# swap was on /dev/sda10 during installation
UUID=ccc262ec-bf43-4fa9-819b-33b6c4abb7a5 none            swap    sw              0       0
```

做完以上工作后，就可以重启了，至于能不能成功，就看造化了。很幸运，没有出现什么问题。:smile:

至于转移后剩下的分区，就只有先放在那里了，以后可能也用不到了……
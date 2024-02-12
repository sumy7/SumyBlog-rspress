---
layout: post
title: CentOS最简单安装与配置vsftpd
date: '2015-10-26 21:41:49'
categories:
  - 服务器与系统
tags:
  - centos
  - vsftpd
  - ftp
  - 服务
  - 网站
---

# CentOS最简单安装与配置vsftpd

> 使用服务器搭建了一个静态网站，需要上传更新网页，于是想到了使用ftp服务来完成这个过程。

## 什么是vsftpd

`vsftpd` 是“very secure FTP daemon”的缩写，安全性是它的一个最大的特点。vsftpd 是一个 UNIX 类操作系统上运行的服务器的名字，它可以运行在诸如 Linux、BSD、Solaris、 HP-UNIX等系统上面，是一个完全免费的、开发源代码的ftp服务器软件，支持很多其他的 FTP 服务器所不支持的特征。比如：非常高的安全性需求、带宽限制、良好的可伸缩性、可创建虚拟用户、支持IPv6、速率高等。vsftpd是一款在Linux发行版中最受推崇的FTP服务器程序。特点是小巧轻快，安全易用。

## 安装vsftpd

登录CentOS服务器，执行以下命令安装vsftpd

```
sudo yum install vsftpd
```

如果还需要FTP客户端，可以运行

```
sudo yum install ftp
```

确保启动时运行vsftpd服务

```
chkconfig vsftpd on
```

启动vsftpd服务

```
sudo service vsftpd start
```

## 添加ftp用户并修改权限

添加一个ftpuser用户用来登录ftp，主目录在apache的网页目录下，禁止此用户登录SSH和shell，并限制其访问其它目录

```
useradd -d /var/www/html -g ftp -s /sbin/nologin ftpuser
```

设置用户口令

```
passwd ftpuser
```

修改/var/www/html的权限

```
sudo chmod 777 /var/www/html
```

## 配置vsftpd

vsftpd的配置文件在`/etc/vsftpd/vsftpd.conf`，打开这个文件

```
sudo vi /etc/vsftpd/vsftpd.conf
```

修改以下配置

```
anonymous_enable=NO #禁止匿名登录
local_enable=YES #设置本地用户可以访问
chroot_local_user=YES #用户不能离开主目录
ascii_upload_enable=YES
ascii_download_enable=YES #设定支持ASCII模式的上传和下载功能
pam_service_name=vsftpd #PAM认证文件名。PAM将根据/etc/pam.d/vsftpd进行认证

local_root=/var/www/html
allow_writeable_chroot=YES #允许主目录写入
```

重启vsftpd

```
sudo service vsftpd start
```

## 使用

现在可以使用一个ftp客户端通过普通的用户名密码方式登录ftp了，主目录限定在apache的目录下可以用来更新网站文件。

## 参考内容

+ [CentOS 6.3 64位ftp服务器搭建-vsftpd安装及配置](http://www.iitshare.com/installation-and-configuration-of-vsftpd.html)
+ [How To Set Up vsftpd on CentOS 6](https://www.digitalocean.com/community/tutorials/how-to-set-up-vsftpd-on-centos-6--2)
+ [CentOS 6.4 下安装vsftpd](http://www.cnblogs.com/xiongpq/p/3384759.html)

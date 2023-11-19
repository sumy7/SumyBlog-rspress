---
layout: post
title: SSH中配置public key认证
date: '2015-12-14 22:42:25'
categories:
  - 高效生活
tags:
  - ssh
  - linux
reference:
  - url: 'http://blog.chinaunix.net/uid-773723-id-152230.html'
    title: ssh key 免密码登录
  - url: 'http://blog.csdn.net/zoucui/article/details/6135078'
    title: 使用Public Key (OpenSSH) 不用密码登陆
---

一般使用SSH登录远端主机的时候，都会使用用户名和密码的方式。为了使远端主机安全，密码会设置的很复杂，这样登录的时候也会有一定的麻烦。
在远端主机使用public key的方式登录，可以免除输入密码。因为今天剁手买了个主机，还没有自己设置过免密码登录，所以就来记录一下大致过程。

# 本地

先要在本地生成rsa公钥和私钥，这里我的shell使用的是Git for Windows里的终端。
如果已经有公钥了，可以跳过这一步，直接使用以前生成的公钥。

```
ssh-keygen -t rsa
```

一般一直按回车就可以了。

之后可以在用户文件夹里的`.ssh`文件夹下找到公钥文件`id_rsa.pub`，打开该文件，记录下里面的内容。

# 远端

通过普通SSH登录到远端主机，以`root`用户为例：
进入`~/.ssh`文件夹，如果没有该文件夹需要自行创建

```
$ mkdir ~/.ssh
$ chmod 700 .ssh
```

注意权限设置为`700`。

进入后找到`authorized_keys`文件，如果没有也需要创建

```
$ touch  ~/.ssh/authorized_keys
$ chmod 600 ~/.ssh/*
```

权限需要设置为`600`。
如果权限不这样设置，SSH服务是不会使用里面的内容的。

将本地`id_rsa.pub`的内容添加到`authorized_keys`中，可以添加多个public key，注意一行一个。

基本上这样就可以使用了。
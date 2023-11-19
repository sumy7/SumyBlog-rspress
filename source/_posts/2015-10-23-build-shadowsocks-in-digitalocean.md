---
layout: post
title: 在Digital Ocean上部署shadowsocks
date: '2015-10-23 18:49:01'
categories:
  - 网站
tags:
  - digitalocean
  - shadowsocks
  - 上网
  - 代理
  - github
reference:
  - title: 使用Digital Ocean和shadowsocks来科学上网
    url: 'http://jerryzou.com/posts/shadowsocks-with-digitalocean/'
---

自从申请到Github的学生开发大礼包之后，就想怎么用其中的各种服务。之前使用goagent代理开始变得不太稳定了，于是考虑在Digital Ocean上搭建一个新的代理，最终选择了shadowsocks。谨以此缅怀goagent和shadowsocks。

# DigitalOcean

## 邀请注册

在注册DigitalOcean之前，可以先去网上找一个邀请链接。通过邀请链接注册可以获得\$10的奖励。
（我的邀请链接：[https://www.digitalocean.com/?refcode=dc33afe984e5](https://www.digitalocean.com/?refcode=dc33afe984e5)）。

## 充值激活

通过邀请链接注册之后还是不能创建虚拟主机，需要绑定信用卡或者充值\$5。鉴于自身的这种情况下，还是充值$5比较好。
充值我选择用PayPal，先去paypal.com注册一个账户，然后绑定一张银联卡（储蓄卡就可以）。接下来需要认证身份，和支付宝绑定银行卡差不多。
PayPal身份认证完成之后，就可以在DigitalOcean生成充值账单，使用PayPal付款。请确保账户中有至少35元的余额。

## 使用优惠码

激活完成后，账户中应该有$15余额。如果有Github的大礼包优惠码，可以使用。
在 Setting-Billing-Promo Code 输入优惠码，但是一般是无法输入的，因为DigitalOcean需要进一步确认你的学生身份。
在 Support-Support Tickets 里新建一个Ticket，大体说明一下你无法使用Github提供的优惠码。
然后会有客服回复，需要向他们提供学生证、录取通知书、优惠码、Github申请截图、优惠码截图等信息，发送到指定的邮箱里。发送之后回复一下Ticket告诉他们信息已发送。
等大约一天左右就会看到账户里增加了优惠码的金额了。
![总金额](http://7xipku.com1.z0.glb.clouddn.com/build-shadowsocks-in-digitalocean-1.png)

## 创建虚拟主机

之后创建虚拟主机，选择$5/mo的足矣。服务器位置我选择了San Francisco的，镜像选择了`Ubuntu 14.04 x64`，添加了IPv6的地址。
SSH key我添加了没有起作用，之后还是选择了用户名密码的方式登录SSH。
创建了之后root密码会发送到邮箱中，第一次登录需要重新设置root密码，没有收到或者忘记了可以选择重置root密码。

# Shadowsocks

由于相关政策，shadowsocks已经不更新了，但是还可以继续使用。

## 获取

在DigitalOcean的虚拟机页面上查到主机的IP。用SSH连接上去。 

```
ssh root@***.***.***.***
```

第一次可能会要求修改root的密码。
先执行一下update命令更新软件源。

```
apt-get update
apt-get upgrade
```

更新完成后安装shadowsocks。

```
apt-get install python-pip
pip install shadowsocks
```

如果使用的CentOS服务器，可以这样安装。

```
yum install python-setuptools && easy_install pip
pip install shadowsocks
```

## 启动shadowsocks服务

可以使用命令行方式启动/终止shadowsocks服务。

```
ssserver -p 8836 -k `password` -m rc4-md5 -d start
ssserver -p 8836 -k `password` -m rc4-md5 -d stop
```

也可以创建一个配置文件，例如shadowsocksconfig.json来启动。

```json
{
    "server":"::",
    "server_port":想开放的服务器端口,
    "local_address":"127.0.0.1",
    "local_port":1080,
    "password":"设置的连接密码",
    "timeout":300,
    "method":"rc4-md5"
}
```

接下来就可以使用这个配置文件来启动/终止服务了。

```
ssserver -c /etc/shadowsocks.json -d start
ssserver -c /etc/shadowsocks.json -d stop
```

## shadowsocks客户端

shadowsocks支持主流的平台，这里只列举了Windows的配置，其它的也差不多。
[OS X / Windows](https://sourceforge.net/projects/shadowsocksgui/files/dist/)
客户端的配置就是配置文件里设置的配置。
![客户端配置](http://7xipku.com1.z0.glb.clouddn.com/build-shadowsocks-in-digitalocean-2.png)
浏览器的配置可以参考goagent的代理配置。这里使用了Chrome插件SwitchyOmega作为例子。
![Chrome插件](http://7xipku.com1.z0.glb.clouddn.com/build-shadowsocks-in-digitalocean-3.png)

---
layout: post
title: 记一次简单的域名解析找回操作
date: '2018-06-26 22:38:55'
categories:
  - 网站
tags:
  - 域名
  - 解析
  - dnspod
---

# 记一次简单的域名解析找回操作

前段时间搞了点东西，想放到自己的域名上。很自然的在域名解析里配置了将域名解析到自己服务器上，结果过了一段时间发现，域名被解析到一个**彩网站上面去了。以为自己搞错了解析，再三确认了配置没有错误。然后开始了解析错误查找之旅。

首先确认了解析有没有过来，使用了[站长工具Ping检测](http://ping.chinaz.com)测试了域名的连通情况，发现国内的解析都指向了一个IP地址，国外的解析都是正常的。而直接访问这个IP地址，就是那个什么什么的网站。

国内国外出现了不同的解析地址，下一步用 `dig` 命令看一下域名的dns情况：

```
sumy@DESKTOP-14HIGI1:/mnt/c/Users/sumy$ dig sumygg.com

; <<>> DiG 9.11.3-1ubuntu1-Ubuntu <<>> sumygg.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 7830
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 2, ADDITIONAL: 11

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;sumygg.com.                    IN      A

;; ANSWER SECTION:
sumygg.com.             600     IN      A       45.114.10.107

;; AUTHORITY SECTION:
sumygg.com.             86202   IN      NS      f1g1ns2.dnspod.net.
sumygg.com.             86202   IN      NS      f1g1ns1.dnspod.net.

;; ADDITIONAL SECTION:
f1g1ns1.dnspod.net.     166658  IN      A       182.140.167.166
f1g1ns1.dnspod.net.     166658  IN      A       14.215.150.17
f1g1ns1.dnspod.net.     166658  IN      A       58.247.212.36
f1g1ns1.dnspod.net.     166658  IN      A       61.151.180.44
f1g1ns1.dnspod.net.     166658  IN      A       180.163.19.15
f1g1ns2.dnspod.net.     166657  IN      A       61.129.8.159
f1g1ns2.dnspod.net.     166657  IN      A       101.226.220.16
f1g1ns2.dnspod.net.     166657  IN      A       121.51.128.164
f1g1ns2.dnspod.net.     166657  IN      A       182.140.167.188
f1g1ns2.dnspod.net.     166657  IN      A       52.220.136.67

;; Query time: 46 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: Sun Jun 17 00:41:30 DST 2018
;; MSG SIZE  rcvd: 269
```

可以发现解析被dnspod接管了，但是我之前并没有在上面配置相关的dns解析？不管怎样还是登陆上去看一看。

dnspod与域名解析的网站很相似，关键是可以 **自定义** 输入域名，即使那个域名不是dnspod所有。我试着输入了我的域名，提示域名已经被其它账户占用了，是否需要认领。

![域名认领提示](./1.png)

认领域名需要认证 **WHOIS** 邮箱，还好之前已经在域名里配置了相关的邮箱，通过WHOIS成功将域名取回到了自己的账户里。

认领回来第一步就是把错误的域名解析删除，然后 _不情愿_ 的换上了自己的域名解析。

查看了域名操作记录，发现它在几天前就已经恶意注册了域名解析，过了几天才被我发现。

![域名操作记录](./2.png)

限于自己的水平，就没对这个邮箱做进一步处理，域名解析找回来了，可喜可贺，可喜可贺。

回想这件事，dnspod这种先来先得的域名认领方式存在很大的隐患，还不知道有多少人的域名被恶意认领。规则之下，无至则溃。

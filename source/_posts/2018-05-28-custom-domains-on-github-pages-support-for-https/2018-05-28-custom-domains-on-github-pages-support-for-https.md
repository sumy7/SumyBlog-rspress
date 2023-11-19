---
layout: post
title: 自定义域名在Github Pages中支持通过HTTPS访问
date: '2018-05-28 21:43:23'
categories:
  - 网站
tags:
  - github
  - https
  - 域名
reference:
  - url: 'https://blog.github.com/2018-05-01-github-pages-custom-domains-https/'
    title: Custom domains on GitHub Pages gain support for HTTPS
  - url: >-
      https://help.github.com/articles/securing-your-github-pages-site-with-https/
    title: Securing your GitHub Pages site with HTTPS
  - url: 'https://help.github.com/articles/using-a-custom-domain-with-github-pages/'
    title: Using a custom domain with GitHub Pages
  - url: 'https://help.github.com/articles/troubleshooting-custom-domains/'
    title: Troubleshooting custom domains
---

最近[Github官方博客](https://blog.github.com/2018-05-01-github-pages-custom-domains-https/)上已经宣布自定义域名也支持通过HTTPS进行访问。之前也没想过要弄个HTTPS，借着这个机会就搞一搞HTTPS访问吧。不过都现在了，已经过了尝鲜期了。

# 更新域名解析地址

之前已经将域名访问指向了 `192.30.252.153` 和 `192.30.252.154`，这次要使用最新的HTTPS需要将域名记录指向新的IP地址，官方给出了四组IP地址：

> 185.199.108.153
> 185.199.109.153
> 185.199.110.153
> 185.199.111.153

我用了顶级域名当做博客的域名，将顶级域名的A记录全部接卸到了以上四个IP地址上。解析规则如下：

{% asset_img 1.png DNS解析配置 %}

Github上给出了很详细的说明，可以参考一下[如何自定义域名](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)。

# 启用HTTPS域名跳转

修改域名解析之后根据解析时间的长短，需要几个小时到1天不等的时间来同步DNS解析。这个时候可以去设置里看一看能不能行。

在Github上，打开你存放博客的那个仓库，选择 **Settings**，在 “GitHub Pages” 下如果可以选中 **Enforce HTTPS** ，那么恭喜你已经开启HTTPS解析了。

但大多数情况还是会出现 **Unavailable for your site because your domain is not properly configured to support HTTPS** 的提示：

{% asset_img 2.png "GitHub Pages配置" %}

这个时候需要先清空 **Custom Domain** 里的设置，保存后重新填入域名，触发一下Github生成页面的机制。如果这时候看到 **Not yet available for your site because the certificate has not finished being issued** 的提示，说明再等一段时间，等Github为你的域名签发证书就选中了。

我在这个过程中遇到了一些问题，修改了DNS解析，删除并添加域名好多次都无法成功生成证书。后来发现之前在DNSPod设置了域名解析，于是把上面的解析删除掉。过了一天左右，通过在线DNS解析测试，发现所有的域名都已经解析到正确的IP地址上：

```shell
$ dig sumygg.com +noall +answer
; <<>> DiG 9.10.3-P4-Ubuntu <<>> sumygg.com +noall +answer
;; global options: +cmd
sumygg.com. 6332 IN A 185.199.111.153
sumygg.com. 6332 IN A 185.199.110.153
sumygg.com. 6332 IN A 185.199.108.153
sumygg.com. 6332 IN A 185.199.109.153
```

但还是无法选中 **Enforce HTTPS** ，无奈之下用蹩脚的英语给Github Staff发了邮件，最后Staff大大帮忙解决了问题。

> Hey there,
>
> Thanks for reaching out! I just gave your certificate a nudge and you should be all set now.
>
> Best,
> Shawna

可喜可贺，可喜可贺。

{% asset_img 3.png 小绿锁 %}

# 检查网站内容

接下来要做的事情是让网站默认跳转到HTTPS，这里从网上 _借鉴_ 了一段代码代码就可以搞定了：

```pug
if theme.forcehttps == true
  script.
    (function (root) {
      "use strict";
      var h = root ? root.location.hostname : "",
      p = root ? root.location.protocol : "";
      if ("http:" === p && !(/^(localhost|127.0.0.1)/).test(h)) {
        root.location.protocol = "https:";
      }
    })("undefined" !== typeof window ? window : this);
```

由于HTTPS访问中不允许出现http和https链接混用的情况，需要检查你网站中的链接，想办法将http升级到https。

其它的以后再说吧，我先去嘚瑟一下了。:sunglasses:

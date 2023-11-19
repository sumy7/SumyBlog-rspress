---
layout: post
title: 在CentOS 7上安装Tomcat 8
date: '2015-11-09 20:16:27'
categories:
  - 网站
tags:
  - tomcat
  - apache
  - centos
reference:
  - url: >-
      https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-8-on-centos-7
    title: How To Install Apache Tomcat 8 on CentOS 7
---

`Apache Tomcat`是一个基于Java应用的网络服务器和servlet容器。Tomcat是一个实现了Java Servlet和JavaServer Pages技术的开源软件，它由Apache Software Foundation发行。要在CentOS下安装Tomcat，需要进行以下几个步骤。

# 安装Java

Tomcat需要服务端的Java运行环境，这样才能保证Java程序的正常运行。这里使用OpenJDK 8来代替JDK的安装。
要安装OpenJDK8，需要运行以下的命令：

```
$ sudo yum install java-1.8.0-openjdk-devel
```

# 创建Tomcat用户

出于安全考虑，Tomcat需要运行在没有特权的用户上。需要创建一个新的用户和用户组来运行Tomcat服务。
首先，要创建一个新的`tomcat`用户组：

```
$ sudo groupadd tomcat
```

然后创建新的`tomcat`用户。使这个用户作为`tomcat`用户组的成员，用户根目录设置到Tomcat的安装位置`/opt/tomcat`，配置终端为`/bin/false`使得不可以用此用户登录终端。

```
$ sudo useradd -M -s /bin/nologin -g tomcat -d /opt/tomcat tomcat
```

# 安装Tomcat

最简单的方法就是安装Tomcat 8绿色版，下载最新的版本，并配置它。

## 下载Tomcat

可以在[Tomcat8下载页面](http://tomcat.apache.org/download-80.cgi)找到Tomcat 8的最新版本。当前最新版本为8.0.28。在**Binary Distributions**分类里的**Core**找到"tar.gz"的下载链接，复制这个下载链接。
将其下载到用户的主目录文件夹下：

```
$ cd ~
$ wget http://mirror.sdunix.com/apache/tomcat/tomcat-8/v8.0.28/bin/apache-tomcat-8.0.23.tar.gz
```

接下来将Tomcat安装到`/opt/tomcat`文件夹，创建这个文件夹，将压缩文件解压到这个目录下：

```
$ sudo mkdir /opt/tomcat
$ sudo tar xvf apache-tomcat-8*tar.gz -C /opt/tomcat --strip-components=1
```

## 设置权限

要访问Tomcat的安装目录，`tomcat`需要有合适的权限。
首先切换到Tomcat的安装目录：

```
$  cd /opt/tomcat
```

授予`tomcat`用户`conf`目录的**写**权限和目录下文件的**读**权限：

```
$ sudo chgrp -R tomcat conf
$ sudo chmod g+rwx conf
$ sudo chmod g+r conf/*
```

然后修改`work`、`temp`、`logs`目录的所有者为`tomcat`用户：

```
$ sudo chown -R tomcat work/ temp/ logs/
```

## 设置systemd文件

要想让Tomcat作为服务启动，需要在配置Tomcat Systemd文件。
创建并打开一个服务配置文件：

```
$ sudo vi /etc/systemd/system/tomcat.service
```

将下列脚本粘贴到改文件中。可能需要修改`CATALINA_OPTS`来设置分配的内存大小。

{% codeblock lang:bash /etc/systemd/system/tomcat.service %}
# Systemd unit file for tomcat
[Unit]
Description=Apache Tomcat Web Application Container
After=syslog.target network.target

[Service]
Type=forking

Environment=JAVA_HOME=/usr/lib/jvm/jre
Environment=CATALINA_PID=/opt/tomcat/temp/tomcat.pid
Environment=CATALINA_HOME=/opt/tomcat
Environment=CATALINA_BASE=/opt/tomcat
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/bin/kill -15 $MAINPID

User=tomcat
Group=tomcat

[Install]
WantedBy=multi-user.target
{% endcodeblock %}

保存，退出。这个脚本告诉系统使用`tomcat`用户按照配置来启动Tomcat服务。

重新加载Systemd来加载Tomcat配置文件：

```
$ sudo systemctl daemon-reload
```

现在可以使用`systemctl`命令来启动Tomcat服务：

```
$ sudo systemctl start tomcat
```

如果想要在开机的时候就启动Tomcat服务，可以运行：

```
$ sudo systemctl enable tomcat
```

现在，Tomcat启动了。可以通过浏览器访问域名或IP地址的`:8080`端口，就可以看到默认起始页了。

> http://server_IP_address:8080

# 配置Tomcat Web管理接口

为了使用Tomcat的管理界面，我们需要为Tomcat服务添加用户。编辑`tomcat-users.xml`文件：

```
$ sudo vi /opt/tomcat/conf/tomcat-users.xml
```

在这个文件里可以看到一些被注释了的配置文件。
如果想要添加一个可以访问`manager-gui`和`admin-gui`的用户，可以如下添加用户名和密码：

{% codeblock tomcat-user.xml lang:xml %}
<tomcat-users>
    <user username="admin" password="password" roles="manager-gui,admin-gui"/>
</tomcat-users>
{% endcodeblock %}

保存并退出tomcat-user.xml文件。要想使配置生效，需要重启Tomcat服务：

```
$ sudo systemctl restart tomcat
```

# 访问网络接口

访问以下地址就可以看到下面的图片：
> http://server_IP_address:8080

{% asset_img 1.png 默认主页 %}
可以看到有指向管理员界面的链接。

点击 Manager App 链接或者访问
> http://server_IP_address:8080/manager/html

{% asset_img 2.png 管理界面 %}
在这个界面，可以管理Java网络应用。可以启动、停止、重新加载、部署或者不部署应用。也可以运行一些诊断程序。最后在页面的最下方可以看到服务器的一些信息。

主机管理可以通过主页的链接或者访问
> http://server_IP_address:8080/host-manager/html/

{% asset_img 3.png 虚拟主机管理界面 %}
通过虚拟主机管理页面，可以为应用添加虚拟主机。

---
layout: post
title: 使用Docker构建PHP+MySQL开发测试环境
date: '2017-03-21 11:18:52'
categories:
  - Docker
tags:
  - docker
  - php
  - mysql
  - 开发测试
---

# 使用Docker构建PHP+MySQL开发测试环境

> 最近强行弄了一份工作，为一个基于ThinkPHP框架的网站添加一点需求功能。于是想着用Docker弄一个开发测试的环境。在配置过程中，遇到了很多的问题，靠着搜索才一步一步的解决了。

## 基础镜像的选用

Docker中大多数镜像都是基于Ubuntu基础镜像进行了修改构建，但是如果我们也从Ubuntu开始构建，那么工作量可想而知。因此选取一个合适的基础镜像可以加快配置速度，也能减少我们配置的工作量。

根据需要，选取了PHP和MySQL两个镜像作为本次开发环境配置的基础镜像。

```
docker pull mysql
docker pull php:7.0-apache
```

另外说明一下，php的镜像有好多版本，具体版本可以参考[DockerHub](https://hub.docker.com/_/php/)上面的说明。这里选用的版本是PHP7.0运行在apache上的版本。

## 启动一个MySQL容器

MySQL作为公共的基础服务，这里配置的MySQL不仅可以供PHP内部使用，也可以在外部连接查询里面的数据。

```
docker run --name mysql -v d:/DockerData/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql
```

以守护进程`-d`的模式启动一个名为`--name mysql`的容器，将`d:/DockerData/mysql`映射到`/var/lib/mysql`目录上提供数据存储，配置环境变量`MYSQL_ROOT_PASSWORD=123456`设置root密码为123456，映射端口`3306`。可以根据实际需要修改命令行的一些参数。

## 启动一个PHP容器

PHP容器需要指定`/var/www/html`目录的位置，为了能使用数据库，还需要链接当上面的MySQL容器。

```
docker run -d --name php-project --link mysql:db -p 81:80 -v h:/Project:/var/www -v h:/Project/public:/var/www/html php:7.0-apache
```

`--link`将上面的mysql容器作为db组件链接到该容器中，由于ThinkPHP的特性，这里在`/var/www`和`/var/www/html`分别挂载了目录。这里在外部使用`81`端口。

## 配置PHP容器组件

默认的PHP容器里还缺少一些PHP插件，需要手动进行安装。

### 进入PHP容器

在PHP容器中执行`bash`命令，就可以在里面输入命令行了。由于PHP容器的主进程是Apache，所以不能通过`docker attach`的方式附加到容器上。

```
docker exec -it php-project bash
```

以下命令都要在容器的bash里执行。

编辑文件的时候发现没有vim，只好安装一个

```
apt update
apt install vim
```

### 配置ThinkPHP的URL重写

配置ThinkPHP的URL重写分两步，开启重写扩展，修改配置文件。

```
a2enmod rewrite   //开启扩展
修改配置 /etc/apache2/apache2.conf 中所有的AllowOverride None改为All
```

### 安装PHP的PDO、GD等组件

普通情况下，可以通过apt安装PHP的PDO插件，但是由于PHP镜像中没有make和gcc等编译器。其实，官方在容器的 **\usr\local\bin** 目录下提供了一些命令，用来编译启用PHP的组件。

```
root@bb80ba155185:/var/www/html# cd /usr/local/bin
root@bb80ba155185:/usr/local/bin# ls
apache2-foreground     docker-php-ext-configure  docker-php-ext-install  pear     pecl  phar.phar  php-config  phpize
docker-php-entrypoint  docker-php-ext-enable     docker-php-source       peardev  phar  php        phpdbg
root@bb80ba155185:/usr/local/bin#
```

直接运行`./docker-php-ext-install`可以看到命令能安装的组件。

安装pdo_mysql组件

```
./docker-php-ext-install pdo_mysql
```

安装gd图形库组件，gd图像库依赖比较多的内容，其实也就是执行的命令稍微麻烦些。先要安装一些依赖库，然后编译安装gd组件。

```
apt-get install -y \
        libfreetype6-dev \
        libmcrypt-dev \
        libpng12-dev \
        libjpeg-dev \
        libpng-dev
docker-php-ext-configure gd \
        --enable-gd-native-ttf \
        --with-freetype-dir=/usr/include/freetype2 \
        --with-png-dir=/usr/include \
        --with-jpeg-dir=/usr/include \
    && docker-php-ext-install gd
```

### 查看MySQL数据库地址

在容器中访问**127.0.0.1:3306**发现找不到MySQL数据库，数据库的地址发生了改变。可以通过环境变量查看MySQL的地址。

```
root@bb80ba155185:/usr/local/bin# env
HOSTNAME=bb80ba155185
DB_NAME=/php-project/db
TERM=xterm
PHP_INI_DIR=/usr/local/etc/php
PHP_ASC_URL=https://secure.php.net/get/php-7.0.16.tar.xz.asc/from/this/mirror
DB_PORT=tcp://172.17.0.2:3306
DB_PORT_3306_TCP_PORT=3306
DB_ENV_GOSU_VERSION=1.7
PHP_CFLAGS=-fstack-protector-strong -fpic -fpie -O2
PHP_MD5=6161aba9d24322d889da5d2ff944bddf
DB_PORT_3306_TCP_PROTO=tcp
PHPIZE_DEPS=autoconf            file            g++             gcc             libc-dev                make            pkg-config              re2c
DB_ENV_MYSQL_ROOT_PASSWORD=123456
PHP_URL=https://secure.php.net/get/php-7.0.16.tar.xz/from/this/mirror
PHP_LDFLAGS=-Wl,-O1 -Wl,--hash-style=both -pie
APACHE_ENVVARS=/etc/apache2/envvars
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
GPG_KEYS=1A4E8B7277C42E53DBA9C7B9BCAA30EA9C0D5763 6E4F6AB321FDC07F2C332E3AC2BF0BC433CFC8B3
PHP_CPPFLAGS=-fstack-protector-strong -fpic -fpie -O2
PWD=/usr/local/bin
DB_PORT_3306_TCP_ADDR=172.17.0.2
SHLVL=1
HOME=/root
PHP_SHA256=244ac39bc657448962860aa7a590e4417f68513ad5e86ee2727b1328b0537309
DB_PORT_3306_TCP=tcp://172.17.0.2:3306
APACHE_CONFDIR=/etc/apache2
DB_ENV_MYSQL_VERSION=5.7.17-1debian8
PHP_EXTRA_BUILD_DEPS=apache2-dev
DB_ENV_MYSQL_MAJOR=5.7
PHP_VERSION=7.0.16
PHP_EXTRA_CONFIGURE_ARGS=--with-apxs2
OLDPWD=/var/www/html
_=/usr/bin/env
```

在容器中执行`env`命令，发现数据库在**172.17.0.2:3306**，成功访问到数据库。

因为之前已经把数据库的端口映射到宿主机的3306端口上，所以在宿主机连接数据库的时候，可以使用**127.0.0.1:3306**地址。

### 重启容器

配置完成后记得重启容器。在宿主机执行命令：

```
docker restart php-project
```

## 其它

第一次，也算在容器内部手动配置了一下容器。以后有机会，可以尝试使用**Dockerfile**构建需要的镜像了。

## 参考内容

+ [docker官方alpine/php镜像下安装php扩展 - TinyJian's Blog](http://blog.csdn.net/tinyjian/article/details/55006624)
+ [freetype - PHP Fatal error: Call to undefined function imagettftext() - Stack Overflow](http://stackoverflow.com/questions/7290958/php-fatal-error-call-to-undefined-function-imagettftext)

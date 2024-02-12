---
layout: post
title: jekyll本地环境搭建
date: '2013-11-08 00:00:00'
categories:
  - 网站
tags:
  - jekyll
---

# jekyll本地环境搭建

> 用jekyll作为写作博客已经有半年多了，一直没有将搭建过程写出来。这几天正好想要给博客添加表格功能，本地环境却一直出错，遂决定重新搭建一下本地的博客环境。

以下以 Windows 为例，说明一下本地测试环境搭建的过程。

## 准备 Ruby 环境

由于 [jekyll](http://jekyllrb.com/) 是用 ruby 语言写的一个静态网页生成工具，所以要搭建 jekyll 本地环境就需要先配置好 ruby 环境。鉴于本人对系统的配置也不是很熟，所以接下来的步骤能省则省。

①.下载 [RubyInstaller](http://rubyinstaller.org/downloads/) ，这是 Ruby 的一个集成包，除 Ruby 之外，捆绑一些额外的资源库，能省掉一些麻烦。下载了“rubyinstaller-2.0.0-p247.exe”，记得安装的时候选上 “Add Ruby executables to your PATH” （添加系统环境变量）这样就省去了手动设置系统环境变量的麻烦，我这里安装到了 D:\Ruby200 下

②.下载对应版本 [DevKit](http://rubyinstaller.org/downloads/)，我下载的是 “DevKit-mingw64-32-4.7.2-20130224-1151-sfx.exe” ，解压进行执行相关命令。我解压到了D:\devkit下，打开cmd，切换到D:\devkit下，分步执行如下的命令，出现如下提示表示安装成功了： 

```
D:\>cd devkit

D:\devkit>ruby dk.rb init
[INFO] found RubyInstaller v2.0.0 at D:/Ruby200

Initialization complete! Please review and modify the auto-generated
'config.yml' file to ensure it contains the root directories to all
of the installed Rubies you want enhanced by the DevKit.

D:\devkit>ruby dk.rb install
[INFO] Updating convenience notice gem override for 'D:/Ruby200'
[INFO] Installing 'D:/Ruby200/lib/ruby/site_ruby/devkit.rb'
```

经过上面的两个步骤，基本的 Ruby 环境就搭建起来了。

## 安装 Jekyll

在正式安装之前，建议先修改一下 Ruby 的镜像源，以加快速度。
可以参考一下[http://ruby.taobao.org/](http://ruby.taobao.org/)的操作步骤。

打开命令提示符，输入下面的命令（via ruby.taobao.com）来修改镜像源：

```
$ gem sources --remove https://rubygems.org/
$ gem sources -a http://ruby.taobao.org/
$ gem sources -l
*** CURRENT SOURCES ***

http://ruby.taobao.org
# 请确保只有 ruby.taobao.org
$ gem install rails
```

可能会有点慢，耐心等待一下就好。

接下来继续输入以下命令：

```
C:\>gem install jekyll
...
C:\>jekyll -v
jekyll 1.3.0
```

出现版本号就代表安装成功了。期间可能会出现`unable to convert "\XXX" from ASCII-8BIT to UTF-8 for XXX/XXX.XX, skipping`的错误，这个忽略就行，没什么影响。

查看一下 jekyll 的帮助文件：

```
$ jekyll
  NAME:
    jekyll

  DESCRIPTION:
    Jekyll is a blog-aware, static site generator in Ruby

  COMMANDS:
    build                Build your site
    default
    docs                 Launch local server with docs for Jekyll v1.3.0
    doctor               Search site and print specific deprecation warnings
    help                 Display global or [command] help documentation.
    import               Import your old blog to Jekyll
    new                  Creates a new Jekyll site scaffold in PATH
    serve                Serve your site locally

  ALIASES:
    hyde                 doctor
    server               serve

  GLOBAL OPTIONS:
    -s, --source [DIR]
        Source directory (defaults to ./)
    -d, --destination []
        Destination directory (defaults to ./_site)
    --safe
        Safe mode (defaults to false)
    -p, --plugins PLUGINS_DIR1[,PLUGINS_DIR2[,...]]
        Plugins directory (defaults to ./_plugins)
    --layouts DIR
        Layouts directory (defaults to ./_layouts)
    -h, --help
        Display help documentation
    -v, --version
        Display version information
    -t, --trace
        Display backtrace when an error occurs
```

至此，Jekyll 的本地环境搭建结束了。

## 参考内容

+ [jekyll本地环境搭建(Windows) - yevon](http://www.cnblogs.com/yevon/archive/2013/09/08/3308158.html)
+ [Jekyll在github上构建免费的Web应用 | 粉丝日志](http://blog.fens.me/jekyll-bootstarp-github/)

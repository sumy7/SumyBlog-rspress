---
layout: post
title: 使用git hooks进行hexo博客自动化部署
date: '2015-11-02 09:59:22'
categories:
  - 网站
tags:
  - git
  - hooks
  - 部署
  - hexo
---

# 使用git hooks进行hexo博客自动化部署

客的一个备份搭在了DigitalOcean的虚拟主机上，于是就出现了一个需求，每次更新博客的时候都需要使用ftp重新上传文件，很容易造成文件的丢失。所以就考虑能不能有一种自动化部署的方案。最近查找的时候发现可以使用git hooks来实现自动化部署。

## git 与 hooks

在CentOS下安装git

```
yum install git
```

安装完git之后，需要使用git的hook特性。

> 钩子(hooks)是一些在"$GIT-DIR/hooks"目录的脚本, 在被特定的事件(certain points)触发后被调用。当"git init"命令被调用后, 一些非常有用的示例钩子文件(hooks)被拷到新仓库的hooks目录中; 但是在默认情况下这些钩子(hooks)是不生效的。 把这些钩子文件(hooks)的".sample"文件名后缀去掉就可以使它们生效了。

需要关注的是`post-receive`的钩子，当`push`操作完成之后这个钩子就会被调用。

## 服务端配置

网站存放在`/var/www/html`目录下，当接收到push请求后，push的内容会被放置到这个目录下。
需要一个可以用来登录ssh的账户。

### 新建git仓库

首先需要在服务器端建一个“裸库”来存放push的内容，“裸库”就是只含`.git`目录下内容的仓库。在这里我们将git仓库放到`/opt/repo/site.git`

```shell
cd /opt
mkdir repo && cd repo
mkdir site.git && cd site.git
git init --bare
```

`--bare`的意思指文件夹不包含源代码，只有版本控制的结构。

### 配置hooks

现在在目录下使用`ls`可以看到版本控制的结构，其中有一个hooks文件夹。进入hooks文件夹并创建一个post-receive文件。

```shell
cd hooks
touch post-receive
```

在post-receive文件夹下写入以下内容

```shell
#!/bin/sh
git --work-tree=/var/www/html --git-dir=/opt/repo/site.git checkout -f
```

别忘了赋予post-receive可执行权限

```shell
chmod +x post-receive
```

`--git-dir` 表示仓库所在的位置
`--work-tree` 表示实际文件被存放的位置
通过这个实现仓库与实际文件的分离

## 本地配置

### 一般流程

进入工作目录，初始化git仓库，然后添加服务器的remote，push提交

```shell
git remote add deploy ssh://user@mydomain.com/opt/repo/site.git
git push deploy master
```

和普通的提交是一样的。

### hexo

我们可以配置使得hexo博客方便的提交到服务器，省去了ftp的步骤。
修改hexo目录下的`_config.yml`文件，找到[deploy]添加一个条目

```yaml
deploy:
- type: git
  repo: github仓库地址
- type: git
  repo: user@mydomain.com:/opt/repo/site.git
```

这样通过`hexo deploy`命令可以同时部署到github pages和服务器上了。

## 参考内容

+ [Git Book 中文版 - Git Hooks](http://gitbook.liuhui998.com/5_8.html)
+ [How To Set Up Automatic Deployment with Git with a VPS](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps)

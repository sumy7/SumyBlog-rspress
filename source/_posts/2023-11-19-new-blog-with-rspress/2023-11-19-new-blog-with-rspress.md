---
layout: post
title: 博客引擎迁移到 rspress
date: 2023-11-19 17:55:00
tags: 
  - rspress
  - blog
categories: 
  - 网站
---

# 博客引擎迁移到 rspress

博客引擎经历了多次变迁，从最初的jekyll到hexo。本来这次想折腾一下hugo的，但是中间出来个rspress，
考虑到目前前端技术比较火热的rust语言，因此决定迁移到rspress。

## 使用rspress搭建博客工程

由于之前的博客引擎基于hexo，因此需要创建一个新的rspress工程，然后将之前的博客文章迁移到新的工程里。

```shell
pnpm create rspress@latest
```

初始化完成后可以在 `package.json` 看到三个命令。

```shell
pnpm run dev
pnpm run build
pnpm run preview
```

## 迁移博客文章

rspress基于[约定式路由](https://rspress.dev/zh/guide/basic/conventional-route.html)，自动扫描 `docs` 目录下的md/mdx文件。

这样不满足我的要求：

1. 文章路径都是固定的格式 `/YYYY/MM/DD/title`，因为不确定外网是否有收录我文章的地方（应该很少），我就不想改变这个路径结构
2. 之前的博客有一百多篇文章，按照上面格式修改创建目录修改比较繁琐。

于是一直在思考如何解决这个问题，最后发现rspress可以编写插件，于是就写了一个插件来解决这个问题。

[插件代码](https://github.com/sumy7/SumyBlog-rspress/blob/main/plugins/BlogPostResolver.ts)就在这个博客仓库里，可以看一下源码。

大概流程是：

1. 遍历 `source/_posts` 目录下的md文件，解析出文章的元数据
2. 省事的调用 hexo 的工具库，解析文章名称中的日期和标题信息
3. 通过插件的 `addPages` 周期方法，将文章路由按照格式添加到路由表中

由此就解决了文章路径的问题。

## 改造博客主题

repress 有个默认主题 `theme-default`，感觉还是挺符合我的胃口的。我也没过多的修改里面的内容和样式。

但是相对于hexo的主题，这个默认主题的功能模块还是比较少的。比如hexo的主题有评论模块，这个默认主题就没有。

后面会单独写一篇文章，记录下如何给rspress添加一些博客模块。

## 使用 Github Actions 自动部署

之前在hexo是在本地调用 deploy 命令，进行部署。这次顺便将部署操作迁移到了 github actions上面。

这是我写的一个部署脚本，可以参考一下。

```yaml
name: SumyBlog site to Pages

on:
  push:
    branches: [main]

  workflow_dispatch:

permissions:
  contents: read
  id-token: write

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      TZ: Asia/Shanghai
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Not needed if lastUpdated is not enabled
      - uses: pnpm/action-setup@v2 # pnpm is optional but recommended, you can also use npm / yarn
        with:
          version: 8
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm
      - name: Install dependencies
        run: pnpm install
      - name: Build with Rspress
        run: |
          pnpm run build
      - name: Archive files
        run: zip -qq -r sumyblog.zip ./doc_build
      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: sumyblog-artifact
          path: ./sumyblog.zip
          if-no-files-found: error
  # Deployment job
  deploy:
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: sumyblog-artifact
      - name: Unzip artifact
        run: unzip -qq sumyblog.zip -d ./
      - name: Commit files
        run: |
          cd ./doc_build
          git init
          git remote add origin git@github.com:sumy7/sumy7.github.io.git
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git branch -m main
          git add .
          git commit -a -m "site updated: $(date -u '+%Y-%m-%d %H:%M:%S')"
      - name: Push Docs
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.DEPLOY_TOKENS }}
          repository: sumy7/sumy7.github.io
          branch: main
          directory: ./doc_build
          force: true
```

## 总结

rspress是一个很不错的博客引擎，基于rust语言，性能和安全性都很好。而且还支持插件，可以自定义一些功能。

由于rspress刚起步，可以折腾的内容还是蛮多的，目前对该引擎比较满意。

## 参考内容

- [rspress官网](https://rspress.dev/)

---
layout: post
title: rspress博客插件折腾记录
date: 2024-03-08 00:00:00
categories: [博客]
tags: [rspress, 博客插件]
---

# rspress博客插件折腾记录

> 首先祝各位姐们儿节日快乐🎉。

之前已经将博客引擎从hexo迁移到了rspress，具体可以参考文章[博客引擎迁移到 rspress](/2023/11/19/new-blog-with-rspress)。
最近也没有闲着，首先将博客的目录结构改成了menorepo的方式，方便管理博客插件和文章内容。然后就是不断完善博客的功能模块，毕竟别家有的内容，咱也不能落下。

如果你也对SumyBlog某些功能感兴趣，不妨看下这篇文章有没有实现你需要的功能。

## 解析hexo文章

上一篇文章也说过解析文章的方式，这段时间将功能模块做成了一个基础的插件，提取出文章的元数据（标题、日期、分类、标签等），供其它插件使用。

源码地址：[plugin-post-resolver](https://github.com/sumy7/SumyBlog-rspress/tree/main/packages/plugin-post-resolver)

该插件只是解析了文件名为 `YYYY-MM-DD-title.md` 格式的文章，并向路由中添加了 `/YYYY/MM/DD/title` 的路径。后续考虑将这个路径格式作为一个配置项提供。

## markdown增强

rspress 默认使用了基于 rust 实现的 [@rspress/mdx-rs](https://github.com/web-infra-dev/mdx-rs) 来解析 markdown 文件，但是目前还不支持一些常用的 markdown 扩展，
比如emoji或者mathtex公式。

这里使用了 js 版本的 mdx 解析器，并补充了对 latex 和 emoji 语法解析的默认配置。

源码地址：[plugin-markdown-presets](https://github.com/sumy7/SumyBlog-rspress/tree/main/packages/plugin-markdown-presets)

## 谷歌统计

这个插件是为了方便添加谷歌统计的功能，核心代码就是在 `index.html` 中添加了谷歌统计的脚本。

源码地址：[plugin-google-analytics](https://github.com/sumy7/SumyBlog-rspress/tree/main/packages/plugin-google-analytics)

## rss订阅

这个参考了其它大神的 rss 插件，主要是将文章的元数据转换成 rss 的格式。具体效果可以在博客右上角的社交链接中找到。

核心思路是读取文件，根据文件的元数据生成 rss 的 xml 文件，也是基于 feed 库处理的元数据。不过文章的摘要生成的存在些问题，这部分还需要重点优化一下。

源码地址：[plugin-feed-rss](https://github.com/sumy7/SumyBlog-rspress/tree/main/packages/plugin-feed-rss)

## 布局改造

博客的主题基于 rspress 默认的主题进行了一些改造，主要是增加了一些功能模块。

1. 没有使用主题的 hero 主页模式，自己实现了一个文章列表的主页。
2. 增加了文章的阅读信息，比如发布日期、阅读量、文章字数等。
3. 增加了评论控件。

### 文章阅读信息

在文章标题的下发，会展示一些文章的阅读信息，比如文章的发布日期、阅读量、文章字数等。

文章信息的位置考虑了好久，由于rspress对文章内容的渲染提供的定制化能力比较少，
一直没有找到好的方法将这些信息放在文章的头部。一段时间考虑先放到了文章目录的上方。

后来发现，通过重写并导出 `getCustomMDXComponent` 方法，就能够自定义文章元素的渲染逻辑。于是重写了 `h1` 标签的渲染逻辑后，最终将文章信息放在了文章标题的下方。 :tada:

文章的阅读量使用的是 `busuanzi` ，不过网上的库都不是很好的兼容 esm 的模块化，所以这里自己通过 fetch-jsonp 的方式去请求页面数据。

字数统计和阅读时间参考了[其它大神](https://github.com/chodocs/chodocs/blob/main/docs/.vitepress/theme/utils/pageInfo.ts)的实现。
效果也是杠杠的。

### 评论控件

评论控件基于 [giscus](https://giscus.app/zh-CN) 实现。可以借助 GitHub Discussions 的功能实现评论的存储和展示。

以前也尝试过其它的评论控件，比如 valine、duoshuo 等，但是服务稳定性和数据安全性都不是很好。这次的 giscus 希望能够众望所归。

## 总结

目前插件的功能已经满足了博客的基本需求，当然也还在不断地完善和改造。如果你对这些插件感兴趣，欢迎一起交流，如果能给这个仓库提交mr就更好了。

后续会考虑将插件发布到npm上，方便大家使用。

## 参考内容

- [ChoDocs 的 VitePress 插件折腾记录](https://chodocs.cn/program/vitepress-plugin/#chodocs-%E7%9A%84-vitepress-%E6%8F%92%E4%BB%B6%E6%8A%98%E8%85%BE%E8%AE%B0%E5%BD%95)
- [记hexo-theme-even主题优化 - Eason Yang's Blog](https://easonyang.com/2021/07/06/a-better-hexo-theme-even/)

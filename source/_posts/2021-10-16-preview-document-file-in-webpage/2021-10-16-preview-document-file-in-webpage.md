---
layout: post
title: 前端实现在线预览文件
date: 2021-10-16 15:28:02
categories: 果然还是前端
tags: [doc, docx, image, pdf, video, 文件预览]
---

# 前端实现在线预览文件

最近的项目，对接阿里OSS做了一个在线物料管理功能。其中就需要在前端预览文件。调研实现了常用文件格式的展示。

## 图片文件

浏览器原生支持展示各类图片文件，需要做的就是将图片展示在div中，并通过css为图片预览添加缩放、画布拖动等功能。

这里使用了 [react-zoom-pan-pinch](https://github.com/prc5/react-zoom-pan-pinch) 来支持图片的缩放、画布拖动功能。

![react-zoom-pan-pinch](./40ca774251fc4869adc17e77a3f07ae1.png)

## 视频文件

跟图片文件同理，视频浏览器也有原生控件支持播放。借助组件 [react-player](https://github.com/cookpete/react-player) 实现了对原生播放器的控制，支持播放、暂停等功能。

![react-player](./a1b5a87cdea04066874c3f8855f475e9.png)

## pdf文件

pdf是一个比较“规整”的文件格式。有插件能很好的支持pdf格式的渲染和展示。

大部分库都是基于 pdfjs 进行的封装，这里选用 [react-pdf](https://github.com/wojtekmaj/react-pdf) 进行pdf的渲染。

![react-pdf](./59a30cc315f04ce6b1d0f541f5d486d5.png)

## docx文件

Office 2007开始，微软对文件格式进行了“升级”，原有三剑客doc、xls、ppt文件后缀增加了x，即docx、xlsx、pptx。新文件格式使用zip格式封装了各种meta数据。使得浏览器解析成为了可能。

word文件基于 [mammoth](https://github.com/mwilliamson/mammoth.js/) 库进行了封装。它做的是将docx文件转换成HTML进行展示，所以无法做到原汁原味的格式渲染。

这里有个[demo页面](https://jstool.gitlab.io/zh-cn/demo/mammoth-js-word-docx-preview-and-convert/)可以尝试一下转换效果。

![快速试用mommoth.js转换](./53679014c0ea4061aaee1bf0c83312bc.png)

其它的x系文件，这里不再介绍（因为没有用到展示。

## doc文件

Office 2007之前的文件，结论是不支持。因为微软没有公开文件的编码格式，目前市面上的各类办公软件对doc文件的支持，都是自己解析的。

这里有个trick可以临时支持这类文件的展示，就是使用iframe引入微软和谷歌官方的文件预览服务。

```text
// 谷歌预览服务
https://docs.google.com/gview?url=https%3A%2F%2Fgithub.com%2Fplangrid%2Freact-file-viewer%2Fblob%2Fmaster%2Fexample_files%2FSampleSpec.docx%3Fraw%3Dtrue&embedded=true

// 微软预览服务
https://view.officeapps.live.com/op/embed.aspx?src=https%3A%2F%2Fgithub.com%2Fplangrid%2Freact-file-viewer%2Fblob%2Fmaster%2Fexample_files%2FSampleSpec.docx%3Fraw%3Dtrue
```

将这两个地址中的url替换为远程的文件链接嵌入就能够看到了。

![谷歌预览服务](./f4d106fecd584f29bb3bb717e4f27f21.png)

![微软预览服务](./5a26172a40324bf68183251e962aa92c.png)

需要“科学上网”。

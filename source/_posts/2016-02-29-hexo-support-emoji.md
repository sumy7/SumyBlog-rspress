---
layout: post
title: 让Hexo支持emoji表情
date: '2016-02-29 16:28:28'
categories:
  - 网站
tags:
  - emoji
  - hexo
  - markdown
  - twemoji
---

# 让Hexo支持emoji表情

写博客的时候发现有些内容不能很好的通过文字表达出来，这时候就需要表情的支持了。所以就研究了一下怎么在博客中加入emoji表情。

网上有很多支持emoji的插件，但是都需要在浏览器端进行处理，考虑到使用的JS库已经够多了，所以尽量还是让Hexo提前渲染为好。

## 调研

大多数有关Hexo和emoji提到的是`hexo-tag-emojis`[插件](https://github.com/sergiolepore/hexo-tag-emojis)，但是这个插件没有对Hexo 3.0提供支持，而且它使用的是`{%raw%}{%%}{%endraw%}`标签选项，这样写起来太麻烦，如果能像Github那样用`::`就好了。

之后发现可以通过修改Hexo默认的Markdown渲染器来实现渲染emoji。

## 修改渲染器

Hexo默认的markdown渲染插件是[hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked)，也就是marked渲染器的Hexo版本，这个渲染器不支持插件扩展。在PR中也提到了要支持emoji，但是却迟迟没有marge进来。然后就是另外一个markdown渲染器[hexo-renderer-markdown-it](https://github.com/celsomiranda/hexo-renderer-markdown-it)，这个渲染器支持插件配置可以使用[markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)插件来支持emoji。我们要将原来的markdown渲染器换成这个。

首先在博客目录下卸载原渲染器，安装新的渲染器：

```bash
$ cd /ppxu/blog/
$ npm un hexo-renderer-marked --save
$ npm i hexo-renderer-markdown-it --save
```

之后下载markdown-it-emoji插件：

```bash
$ npm install markdown-it-emoji --save
```

> **2017-08-01更新：** 还需要为博客安装twemoji依赖 `yarn add twemoji`

编辑Hexo的配置文件`_config.yml`来配置markdown渲染器，更多配置选项可以参考文档[Advanced Configuration](https://github.com/celsomiranda/hexo-renderer-markdown-it/wiki/Advanced-Configuration)：

```yaml
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: false
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-footnote
    - markdown-it-sup
    - markdown-it-sub
    - markdown-it-abbr
    - markdown-it-emoji
```

这时候启动Hexo服务就生效了。输入`:smile: :smirk: :relieved:`，会渲染成 😄 😏 😌。

## 使用图片表情

Unicode字符表情有点看不清楚，考虑能不能换成图片样式的emoji表情？markdown-it-emoji[文档](https://github.com/markdown-it/markdown-it-emoji#change-output)中提到可以修改输出函数来改变输出样式。但是它是以附属插件加载的，无法通过配置文件修改，只好修改源代码了。

首先下载[twemoji](https://github.com/twitter/twemoji)，用twemoji将unicode表情转换成图片：

```bash
$ npm install twemoji
```

接下来再修改markdown-it-emoji模块里的`/node_modules/markdown-it-emoji/index.js`文件：

```javascript
'use strict';


var emojies_defs      = require('./lib/data/full.json');
var emojies_shortcuts = require('./lib/data/shortcuts');
var emoji_html        = require('./lib/render');
var emoji_replace     = require('./lib/replace');
var normalize_opts    = require('./lib/normalize_opts');

var twemoji = require('twemoji'); //引用 twemoji

module.exports = function emoji_plugin(md, options) {
  var defaults = {
    defs: emojies_defs,
    shortcuts: emojies_shortcuts,
    enabled: []
  };

  var opts = normalize_opts(md.utils.assign({}, defaults, options || {}));

  // 使用 twemoji 渲染
  md.renderer.rules.emoji = function(token, idx) {
    return twemoji.parse(token[idx].content);
  };

  md.core.ruler.push('emoji', emoji_replace(md, opts.defs, opts.shortcuts, opts.scanRE));
};
```

重新启动Hexo就可以看到表情变成图片了:smile:。

emoji图片表情就是这个样子了，还是希望`marked`渲染器能支持类Github的emoji渲染。

> **2018-05-23更新：** 每次修改感觉有点麻烦，于是把 markdown-it-emoji 的代码逻辑提取出来，结合 twemoji 从新写了一个插件。名字叫 `mie-wrap-twemoji`，不会起名字，所以就不要吐槽名字了。

引入插件，先把之前的插件卸载，然后安装新的插件

```bash
$ npm uninstall markdown-it-emoji twemoji
$ npm install mie-wrap-twemoji
```

在`_config.yml`中配置去掉 `markdown-it-emoji` 条目，改为 `mie-wrap-twemoji` 条目。

```yaml
markdown:
  render:
  anchors:
  plugins:
    - mie-wrap-twemoji
```

配置解析出的emoji图片的样式，使其作为一个文字大小展示。

```css
img.emoji {
    display: inline-block;
    width: auto;
    height: 1.2em;
    padding: 0;
    margin: 0;
}
```

## 参考内容

+ [让Hexo支持emoji表情](https://ppxu.me/2015/12/24/enable-emoji-in-hexo/)
+ [markdown-it demo](https://markdown-it.github.io/)

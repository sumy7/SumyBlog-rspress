---
layout: post
title: emoji在Github也在Twitter
date: '2016-01-02 20:00:32'
categories:
  - 高效生活
tags:
  - emoji
  - github
  - twitter
  - twemoji
reference:
  - url: 'http://www.emoji-cheat-sheet.com/'
    title: EMOJI CHEAT SHEET
  - url: 'https://github.com/arvida/emoji-cheat-sheet.com'
    title: arvida/emoji-cheat-sheet.com
  - url: 'http://www.cnblogs.com/Wayou/p/use_emoji_in_github.html'
    title: 代码提交的时候可以插入表情了-GitHub表情的使用
  - url: 'https://twitter.github.io/twemoji/'
    title: twem❤ji
---

Github 是全球最大的“同性”交友网站`(￣ε(#￣)☆╰╮(￣▽￣///)`，不对不对，是最大的代码分享网站。就gayhub来说`(￣ε(#￣)☆╰╮(￣▽￣///)`，就网页版的github来说，有很多丰富的功能（快捷键啦、命令行跳转啦）。这里介绍一下github的emoji功能。

# 效果

github上的emoji可以用在几乎所有可以显示文字的地方。比如简介、README、提交说明、项目Wiki页等。具体能用在哪里大家可以自己尝试一下。
{% asset_img 1.png 提交说明上的emoji %}

# 使用

使用emoji很简单。由于不能插入图片，所以需要通过一些特殊符号来插入。
比如`:blush:`就会变成<img style="display: initial" src="http://www.emoji-cheat-sheet.com/graphics/emojis/blush.png">

在提交信息的时候可以

```
git commit –m 'commit some changes :blush:'
```

具体emoji和对应名可以参考[http://www.emoji-cheat-sheet.com/](http://www.emoji-cheat-sheet.com/)。

# 支持的网站

不仅仅是Github，还有一些地方支持这种emoji格式。
> A one pager listing the different emoji emoticons supported on Campfire, GitHub, Basecamp Next, Teambox,Plug.dj, Flowdock, Sprint.ly, GitLab, Kandan, andbang, Trello, Hall, Qiita, Trello, Zendesk, Ruby-China, Grove,Idobata, NodeBB Forums, Slack, Streamup, Quip, OrganisedMinds, and Hackpad.

# twemoji

今天在闲逛的时候偶然发现了[Twemoji](https://twitter.github.io/twemoji/)，这是Twitter开源的完整的Emoji表情图片。开发者可以去[Github](https://github.com/twitter/twemoji)上下载完整的表情库，并将其用到自己感觉高大上的地方。
[效果展示](https://twitter.github.io/twemoji/preview.html)
首先引入js库

```html
<script src="//twemoji.maxcdn.com/twemoji.min.js"></script>
```

然后调用`twemoji.parse( ... )`函数来解析emoji。
如

```javascript
twemoji.parse('I \u2764\uFE0F emoji!');

// will produce
/*
I <img
  class="emoji"
  draggable="false"
  alt="❤️"
  src="https://twemoji.maxcdn.com/36x36/2764.png"> emoji!
*/
```

不仅可以来解析string也可以来解析DOM。

```javascript
var div = document.createElement('div');
div.textContent = 'I \u2764\uFE0F emoji!';
document.body.appendChild(div);

twemoji.parse(document.body);

var img = div.querySelector('img');

// note the div is preserved
img.parentNode === div; // true

img.src;        // https://twemoji.maxcdn.com/36x36/2764.png
img.alt;        // \u2764\uFE0F
img.className;  // emoji
img.draggable;  // false
```

具体怎么使用可以参考github上面的介绍。
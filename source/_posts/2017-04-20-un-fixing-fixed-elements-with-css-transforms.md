---
layout: post
title: 博客添加渐变效果出现的fixed问题
date: '2017-04-20 23:18:11'
categories:
  - 果然还是前端
tags:
  - css
  - fixed
  - transforms
---

# 博客添加渐变效果出现的fixed问题

最近特别喜欢某些博客的渐变加载效果，于是就照着制作了一个，感觉还可以。

# 渐变效果

首先分析一下本博客模板的页面结构，主要分为三行。

> #header 标题栏
> #layout 正文内容
> #footer 底部信息

主要思路是当页面加载完毕后，根据延迟给相应的位置加上 `loaded` class属性。

```javascript
(function ($) {
    $(function () {
        $('#header').addClass('loaded');
        setTimeout(
            function () {
                $('#layout').addClass('loaded');
            }, 300);
        setTimeout(
            function () {
                $('#footer').addClass('loaded');
            }, 600);
    });

})(jQuery);
```

然后在css中声明之前的样式为 **透明度0,向上偏移20px**，加载完成 `loaded` 的样式为 **透明度1,偏移还原**。

```css
#header, #layout, #footer {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
    transition: all .5s ease;
}
#header.loaded, #layout.loaded, #footer.loaded {
    transform: translate3d(0, 0, 0);
    opacity: 1;
}
```

刷新一下就可以看到效果了。

# fixed问题

之后在调试post页面的时候，发现右侧 **文章目录** 位置没有出现在最右面，而是出现在了 `#layout` 的里面。

在调试了一段时间后发现是 `transform` css属性的问题，在控制台中去掉该属性后文章目录的行为表现的很正常。查询博文发现这个问题很正常，主要是因为 `transform` 属性的动画行为会影响 `fixed` 的定位，使其不再基于 viewport 定位。

在尝试了几个方法后，都没有很好的解决这个问题:disappointed:。只好出此下策，将 **文章目录** 整个弄到与 `#header,#layout,#footer` 同级，然后在模板里加入判断条件只有是 post 页面才渲染目录部分。也算解决了这个问题了:tada:。

## 参考内容

+ [Transform 属性会导致子元素的 fixed 属性失效 | 潜行者m](http://www.qianxingzhem.com/post-1985.html)

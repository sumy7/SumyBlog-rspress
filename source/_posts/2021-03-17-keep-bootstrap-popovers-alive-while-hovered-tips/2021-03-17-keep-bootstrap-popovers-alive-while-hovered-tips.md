---
layout: post
title: 使用Bootstrap的popovers时鼠标移动到tips也保持展示
date: '2021-03-17 23:24:45'
categories:
  - 果然还是前端
tags:
  - bootstrap
  - jquery
  - popover
reference:
  - url: >-
      https://stackoverflow.com/questions/15989591/how-can-i-keep-bootstrap-popovers-alive-while-being-hovered
    title: >-
      jquery - How can I keep Bootstrap popovers alive while being hovered? -
      Stack Overflow
---

目的是需要制作一个点击可以打开OA进行聊天的链接，鼠标放置上去可以展示当前人的邮箱等联系方式。

以前的平台使用的是Bootstrap的前端控件，所以选择popover控件作为实现的基础控件。但是使用时发现，popover控件提供的几种方式，hover模式下鼠标移开之后tips就会关闭，而click的体验不太好。想要的效果是，鼠标移动展示邮箱tips，鼠标移动到tips上可以进一步操作（选中复制邮箱等）。

参考了Stack Overflow上的一个问题，最终实现了该功能。

核心代码如下：

```javascript
$('.pop').popover({
    trigger: 'manual',
    html: true,
    animation: false
})
.on('mouseenter', function () {
    var _this = this;
    $(this).popover('show');
    $('.popover').on('mouseleave', function () {
      $(_this).popover('hide');
    });
}).on('mouseleave', function () {
    var _this = this;
    setTimeout(function () {
        if (!$('.popover:hover').length) {
          $(_this).popover('hide');
        }
    }, 300);
});
```

实现的大体思想是，将popover的触发模式改为手动manual。然后监听鼠标进入离开的事件。

+ 如果鼠标进入触发位置，则弹出popover，并注册一个离开tips则隐藏的事件
+ 如果鼠标离开触发位置，则300ms后判断，鼠标不在tips时则隐藏
+ 鼠标离开tips时，触发进入时注册的事件，进行隐藏

实现效果：

<iframe height="532" style="width: 100%;" scrolling="no" title="QWGRqbw" src="https://codepen.io/sumy7/embed/preview/QWGRqbw?height=532&theme-id=light&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sumy7/pen/QWGRqbw'>QWGRqbw</a> by sumy
  (<a href='https://codepen.io/sumy7'>@sumy7</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


直接使用的是Stack Overflow的栗子，可以进行适当改进，原理还是差不多的。如果有幸能找到以前的代码，会再修改完善一下。

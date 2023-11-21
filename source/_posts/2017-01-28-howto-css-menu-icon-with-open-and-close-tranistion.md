---
layout: post
title: 用CSS制作一个带有动画的菜单开关标识
date: '2017-01-28 14:13:35'
categories:
  - 果然还是前端
tags:
  - css
  - menu
  - icon
  - javascript
---

# 用CSS制作一个带有动画的菜单开关标识

> 先祝大家鸡年大吉<del>吧</del>。看过NEXT模板主题的博客，很喜欢它目录放在侧边栏的样子，于是寻思着也给博客弄一个侧边栏目录。其中用到了如何用CSS和JavaScript实现一个带动画的菜单图标。

## 静态菜单图标

常见的菜单图标由三条黑线组成：

```html
<div class="menu-icon-wrapper">
    <div></div>
    <div></div>
    <div></div>
</div>
```

```css
.menu-icon-wrapper div {
    width: 35px;
    height: 5px;
    background-color: black;
    margin: 6px 0;
}
```

3条黑线并排在 `menu-icon-wrapper` 里，通过 `margin` 设置间隔，形成菜单图标。

## 动画菜单图标

动态菜单图标是在静态菜单图标的基础上通过控制变形形成的。

首先添加HTML

```html
<div class="menu-icon-wrapper open" onclick="toggle(this)">
    <div class="menu-icon-first"></div>
    <div class="menu-icon-second"></div>
    <div class="menu-icon-thrid"></div>
</div>
```

然后添加基本菜单样式的CSS代码

```css
.menu-icon-wrapper {
    display: inline-block;
    cursor: pointer;
}

.menu-icon-first, .menu-icon-second, .menu-icon-thrid {
    width: 35px;
    height: 5px;
    background-color: black;
    margin: 6px 0;
    transition: 0.4s;
}
```

接下来控制三个 *横线* 使其变为关闭的样式。横线的位置需要根据显示的样式进行微调。

```css
/* 旋转第一条横线 */
.close .menu-icon-first {
    -webkit-transform: rotate(-45deg) translate(-8px, 7px);
    transform: rotate(-45deg) translate(-8px, 7px);
}

/* 隐藏第二条横线 */
.close .menu-icon-second {
    opacity: 0;
}

/* 旋转第三条横线 */
.close .menu-icon-thrid {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
}
```

还要一个效果，鼠标移到菜单上的时候，图标需要变为向左的箭头样式

```css
/* 旋转缩短第一条横线 */
.open:hover .menu-icon-first {
    -webkit-transform: rotate(-45deg) translate(-6px, 0px);
    transform: rotate(-45deg) translate(-6px, 0px);
    width: 20px;
}

/* 旋转缩放第二条横线 */
.open:hover .menu-icon-thrid {
    -webkit-transform: rotate(45deg) translate(-7px, 0px);
    transform: rotate(45deg) translate(-7px, 0px);
    width: 20px;
}
```

最后添加JavaScript代码控制菜单样式

```javascript
function toggle(menu) {
    menu.classList.toggle("open");
    menu.classList.toggle("close");
}
```

预览一下效果。

<iframe height="300" style="width: 100%;" scrolling="no" title="menu icon" src="https://codepen.io/sumy7/embed/YzayvRx?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/sumy7/pen/YzayvRx">
  menu icon</a> by sumy (<a href="https://codepen.io/sumy7">@sumy7</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 参考内容

+ [How TO - Menu Icon](http://www.w3schools.com/howto/howto_css_menu_icon.asp)

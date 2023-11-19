---
layout: post
title: 体验JQuery Terminal Emulator插件
date: '2015-12-10 21:26:57'
categories:
  - 网站
tags:
  - jquery
  - 插件
  - 网站
reference:
  - url: 'http://terminal.jcubic.pl/'
    title: JQueryTerminal
---

自从看了[JetBrains](https://www.jetbrains.com/)主页上那个命令行模拟器，就一直想弄一个玩玩。今天谷歌了一下，果然有这样的插件。

{% asset_img 1.png JetBrains首页的命令行模拟器 %}
暂时选定了使用这个[http://terminal.jcubic.pl/](http://terminal.jcubic.pl/)：
主页上的标题也感觉非常高大上：

```
      __ _____                     ________                              __
     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
/  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
\___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
          \/              /____/                                     0.8.8
```

这一周就开始搞这个吧:-D。

# 下载引用

首先从官网下载需要压缩包文件，建议将以下文件引入到网页中：

```html
<script src="js/jquery.terminal-0.9.1.min.js"></script>
<script src="js/jquery.mousewheel-min.js"></script>
<link href="css/jquery.terminal-0.9.1.css" rel="stylesheet"/>
```

创建对应的显示区域

```html
<div class="terminal_container hidden-xs hidden-sm">
    <div class="terminal_close"></div>
    <div class="terminal" id="s_terminal">
    </div>
</div>
```

让terminal显示到浮动在右下角，并有关闭按钮，需要CSS限定位置

```css
.terminal_container {
    position: fixed;
    left: auto;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: auto;
    height: auto;
    opacity: 1;
}
.terminal_container .terminal#s_terminal {
    overflow-y: auto;
    overflow-x: hidden;
    padding: 23px 23px 0;
    background-color: rgba(0,0,0,0.9);
}
.terminal_container .terminal#s_terminal .cmd {
    background-color: transparent;
}
.terminal_container .terminal_close:before {
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    background: transparent url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%22-388.5%20313.5%2014%2014%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M-388.5%20327.281v-1.181l5.709-5.709-5.709-5.709v-1.182h1.181l5.709%205.709%205.708-5.709h1.182v1.182l-5.708%205.709%205.708%205.709v1.182h-1.182l-5.708-5.709-5.709%205.709h-1.181z%22%2F%3E%3C%2Fsvg%3E") no-repeat 50%/.6em;
    content: '';
    color: #fff;
    font-size: 14px;
    line-height: 1.2;
    text-align: center;
    -webkit-transition: background-color .4s;
            transition: background-color .4s;
}
.terminal_container .terminal_close:hover:before {
    background-color: rgba(255,0,0,0.9);
}
.terminal_container .terminal_close {
    position: absolute;
    z-index: 12;
    cursor: pointer;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background-color: rgba(0,0,0,0.9);;
}
```

然后用js实现功能

```javascript
function closeterminal(){
  $('.terminal_container').hide();
}
$('.terminal_close').bind("click", closeterminal);

jQuery(function($, undefined) {
    $('#terminal').terminal(function(command, term) {
        if (command !== '') {
            var result = window.eval(command);
            if (result != undefined) {
                term.echo(String(result));
            }
        }
    }, {
        greetings: 'Javascript Interpreter',
        name: 'js_demo',
        height: 200,
        width: 450,
        prompt: 'js> '
    });
});
```

一个简单的右下角浮动shell就出现了。

# 问题

在我的博客上部署的时候很奇怪发现，命令行的一行只有35个字符，无法充满整个命令行。一直找不到是啥原因。
于是去博客上询问了一下作者，并附上了一个简单的DEMO[http://jsfiddle.net/sumy/f7qdrp1y/](http://jsfiddle.net/sumy/f7qdrp1y/)。作者看了之后指出，要修改字体，需要将所有的`terminal`统一字体。
但是这样还是不行，最后发现是在计算单个字符的地方出现了点差错。

作者计算单个字符的时候使用了`.terminal span`里空格的宽度，但是这个类选中了一个莫名其妙的字体，导致空格无故变宽。通过修改css强制修改`font-family`就可以了。

```css
.terminal span{
    font-family: fantasquesansmono !important;
}
```
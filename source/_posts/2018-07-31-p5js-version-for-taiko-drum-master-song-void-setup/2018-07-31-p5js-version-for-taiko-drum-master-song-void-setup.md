---
layout: post
title: 魔法の筆 呪文で絵描くよ 君も描こう！
date: '2018-07-31 13:48:45'
---

# 魔法の筆 呪文で絵描くよ 君も描こう！

好久没更新博客了，今天趁着月末就再来水一篇吧。

## 起因原来是太鼓达人

前十几天刷微博的时候发现一个有意思的歌曲，就是歌曲的歌词其实是一个程序，有人还把这首歌的歌词听写出来，然后跑起来了。

<iframe width="560" height="315" src="https://www.youtube.com/embed/RuA9ZwIW7Mg" title="void setup" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

听完魔性的音乐后，一颗搞事的心在熊熊燃烧，就把这段代码抄了下来。。。

```cpp
void setup(){
  size(400,400);
}

float a = 0;

void draw(){
  fill (#021050,5);
  rect (0,0,width,height);
  translate (200+a*10,200+a*10);
  rotate (a);
  scale (a/15);
  a+= 0.05;
  kao (0,-50);
  kao (1,50);
  if (a>30) a-= 50;
}

//魔法の筆 呪文で絵描くよ 君も描こう！
void kao (int don,float b){
  stroke (0);
  strokeWeight (2);
  fill (#e7eedd);
  ellipse (b,0,50,50);
  noStroke ();
  fill (#68c0c0 + #8f8768 * don);
  ellipse (b,0,38,38);

  stroke (0);
  strokeWeight (1.4);
  arc (b + 4.26,5,8.5,7.3,0.3,PI,OPEN);
  arc (b - 4.26,5,8.5,7.3,0,PI-0.3,OPEN);

  fill (0);
  ellipse (b-11,-2,6.56,7);
  ellipse (b+11,-2,6.56,7);
}

//世界が始まるよーーー
```

## void_setup的即兴转换

查了一下这段代码所用的语言，使用的是一个叫[Processing](https://processing.org/)的语言。好巧的是前段时间又正好了解了这个语言的 JavaScript 实现版 [p5.js](https://p5js.org/)。能不能将上面的语言实现成下面的这种呢？

在一个周末，借助文档、搜索引擎和零食，成功的完成了代码的转换工作。由于是同一种语言的不同实现，代码的相似度还是挺高的。这段代码可以直接运行。

<iframe height="300" style="width: 100%;" scrolling="no" title="void setup" src="https://codepen.io/sumy7/embed/YzNEXvd?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/sumy7/pen/YzNEXvd">
  void setup</a> by sumy (<a href="https://codepen.io/sumy7">@sumy7</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 魔法的画笔，你也一起来画吧

在转换的过程中，遇到了一些“不太兼容”的问题。

在网页上需要转换成Canvas画布，于是 `size()` 命令就转成了 `createCanvas()` 命令。

Processing中的颜色可以直接作为常亮使用，而JavaScript中的颜色使用字符串的形式表示，不同的写法代表不同的意义。如 `rgba()` 是颜色附带了透明度的形式。

颜色还有一个不同的地方是JavaScript的颜色不能直接相加。在Processing中小红的颜色是根据小蓝的颜色 `#68c0c0` 加上 `#8f8768` 得到的，这里直接使用了计算后的小红的颜色值 `#fb4828` 。颜色相加就是普通的二进制相加。

绘制的算法主要分为两个步骤，第一步是进行画布变换，对画布进行位移、旋转、缩放的变换。第二步则是在变换后的画布上绘制两个图像，图像的绘制由 `kao()` 函数完成。

![画一画](./canvas_draw.png)

一个很简单的绘图小程序就这样出现了（再次。

## 最后才开始吧

对了，忘了说这首歌叫《void setup》，可惜的是网易云音乐还没有收录该音乐。不过自己已经从油管上下载了音频文件，有空的时候可以慢慢回味一下。

## 参考内容

+ [Processing](https://processing.org/)
+ [p5.js](https://p5js.org/)

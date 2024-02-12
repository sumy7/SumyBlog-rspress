---
layout: post
title: 为网页添加一个网格粒子动画的背景
date: '2017-05-29 18:26:21'
categories:
  - 果然还是前端
tags:
  - canvas
  - 粒子
  - 前端
  - javascript
---

# 为网页添加一个网格粒子动画的背景

好些日子之前，发现某乎的背景特别漂亮，在某些机缘巧合之下，又在好多地方发现了类似这种“网格粒子”的背景。一种“抄袭之魂”油然而生，对着一篇文章，按照自己的想法实现了一下。本来打算顺势改进一下“引擎”，但是整个做下来发现这个“引擎”改进的方向有点偏，导致好多地方很难看懂了。下面将大体的思路说明一下，具体细节可以参考代码或者【参考文献】中的文章。

## 粒子运动

参考物理学的运动，这里每个粒子的运动是独立的，相互之间没有作用力的干扰。在初始化的时候需要给粒子设置初始位置、初始速度、初始速度方向，根据这几个值，就能计算出下一步粒子运动的行为。

首先定义一些配置变量：

```javascript
this.opts = {
    particleAmount: 100,                  //粒子个数
    defaultSpeed: 0.5,                    //粒子运动速度
    variantSpeed: 0.5,                    //粒子运动速度的变量
    particleColor: "rgb(32,245,245)",     //粒子的颜色
    lineColor: "rgb(32,245,245)",         //网格连线的颜色
    defaultRadius: 1,                     //粒子半径
    variantRadius: 1,                     //粒子半径的变量
    minDistance: 100                      //粒子之间连线的最小距离
}
```

然后根据这些变量，可以计算出粒子当前的状态信息：

```javascript
var x = Math.random() * borderWidth;      // 粒子当前位置
var y = Math.random() * borderHeight;
var w = borderWidth;                      // 粒子运动边界
var h = borderHeight;
var speed = that.opts.defaultSpeed + that.opts.variantSpeed * Math.random();     // 粒子运动速度
var directionAngle = Math.floor(Math.random() * 360);                            // 粒子运动方向
var color = that.opts.particleColor;
var radius = that.opts.defaultRadius + Math.random() * that.opts.variantRadius;  // 粒子半径
var vector = {   // 粒子在某个方向上的加速度
    x: speed * Math.cos(directionAngle),
    y: speed * Math.sin(directionAngle)
};
```

更新操作 **update** ，需要计算出下一帧粒子的位置。如果粒子到达边界，将粒子的该方向上的加速度反向，最后根据加速度更新位置。

```javascript
if (x > w || x <= 0) {
    vector.x *= -1;
}
if (y > h || y <= 0) {
    vector.y *= -1;
}
x += vector.x;
y += vector.y;
```

绘制操作 **draw**， 根据状态信息绘制粒子。

```javascript
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.closePath();
ctx.fillStyle = color;
ctx.fill();
```

然后补充上模板代码，粒子基本的运动操作就完成了。

## 划线连接

上面粒子配置中提到了一个变量 `minDistance` ，如果两个粒子之间的距离小于该值，就在这两个粒子之间绘制一条连线。但是单纯绘制连线不太美观，最好根据距离，距离越近连线的颜色越深。

```javascript
for (var i = 0; i < that.spirits.length; i++) {
    var distance = Math.sqrt(Math.pow(x - that.spirits[i].x(), 2) + Math.pow(y - that.spirits[i].y(), 2));
    var opacity = 1 - distance / that.opts.minDistance;
    if (opacity > 0) {
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgba(" + lineColor[0] + "," + lineColor[1] + "," + lineColor[2] + "," + opacity + ")";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(that.spirits[i].x(), that.spirits[i].y());
        ctx.closePath();
        ctx.stroke();
    }
}
```

`distance` 的计算使用了亮点之间的距离公式。把这段代码放到 **draw** 函数内，这样基本上就完成了。

还需要考虑一点，如果窗口大小改变，那么超出边界的粒子可能再也回不来了。这里为监听了 `resize` 事件，在resize的时候，如果有粒子超出了窗口范围，那么就将该粒子重新放置到边界位置。

```javascript
resize: function (width, height) {
    w = width;
    h = height;
    if (x >= w) x = w;
    if (y >= h) y = h;
}
```

大概需要注意的地方就这么多了，我把自己实现的代码放到jsfiddle上，可以参考一下。

<iframe height="300" style="width: 100%;" scrolling="no" title="粒子背景" src="https://codepen.io/sumy7/embed/eYMpLKj?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/sumy7/pen/eYMpLKj">
  粒子背景</a> by sumy (<a href="https://codepen.io/sumy7">@sumy7</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 网页背景

接下来就是要把这个canvas设置为背景的时候了，需要注意一下几点：

1. Canvas代码加载需要一定的时间，所以最好把定义Canvas的CSS背景颜色和网页背景颜色设为一致
1. 要将Canvas充满背景，需要将Canvas的position设为fixed，Canvas的大小也要与窗口大小innerHeight和innerWidth保持一致
1. 监听window的resize事件，做到Canvas大小跟随窗口大小

控制Canvas的CSS，使用fixed控制位置；网页背景与Canvas背景保持一致。

```css
canvas#background-canvas {
    position: fixed;
    display: block;
    left: 0;
    top: 0;
    background: #f7fafc;
    z-index: -1;
}

html {
    background-color: #f7fafc;
}
```

监听窗口的resize事件，然后修改Canvas大小。

```javascript
window.addEventListener("resize", function () {
    // 设置Canvas的宽高分别为 window.innerWidth 和 window.innerHeight
}, false);
```

花了一下午的时间。至此，就为博客换上了一个Canvas背景:tada:。

## 参考内容

+ [canvas动画之二 -- 创建动态粒子网格动画 - Sweet oDream](http://blog.csdn.net/u014346301/article/details/53608055)

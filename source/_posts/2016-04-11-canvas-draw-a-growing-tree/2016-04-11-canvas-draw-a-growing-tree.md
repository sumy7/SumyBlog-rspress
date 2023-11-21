---
layout: post
title: 使用Canvas画一棵生长的树
date: '2016-04-11 19:43:09'
categories:
  - 果然还是前端
tags:
  - javascript
  - canvas
  - html
---

# 使用Canvas画一棵生长的树

四月，很快的到了。说到四月，我想到了一句话“四月是你的谎言”，也不知道出处在哪里。其实四月果然还是花开花落的季节。三月月末在思考四月的banner的时候，联想到了一个游戏 `Prune`，中文翻译是“修剪艺术”。很喜欢里面的树的生长方式，于是就有了 **四月，花开花落** 的banner。为了实现这个banner，也参考了一些代码。

## 静态的树

前期在取材的时候从 [Github](https://gist.github.com/gsluthra/3401766) 上找到一颗静态的树，看代码实现的很不错，基本上符合我的要求。

https://gist.github.com/gsluthra/3401766
```html
<html>

<head>

<script type="text/javascript">

	window.onload = draw;
	
	function draw(){
	  var canvas = document.getElementById('myCanvas');
	  if (canvas.getContext){
	    var context = canvas.getContext('2d');
	    drawFractalTree(context); 
	  }
	  else{
	    alert("HTML5 Canvas isn't supported by your browser!");
	  }
	}

	function drawFractalTree(context){

		drawTree(context, 800, 800, -90, 11);
	}

	function drawTree(context, x1, y1, angle, depth){

		var BRANCH_LENGTH = random(0, 20);

		if (depth != 0){
			var x2 = x1 + (cos(angle) * depth * BRANCH_LENGTH);
			var y2 = y1 + (sin(angle) * depth * BRANCH_LENGTH);
			
			drawLine(context, x1, y1, x2, y2, depth);
			drawTree(context, x2, y2, angle - random(15,20), depth - 1);
			drawTree(context, x2, y2, angle + random(15,20), depth - 1);
		}
	}

	function drawLine(context, x1, y1, x2, y2, thickness){
		context.fillStyle   = '#000';
		if(thickness > 6)	
			context.strokeStyle = 'rgb(139,126, 102)'; //Brown		
		else
			context.strokeStyle = 'rgb(34,139,34)'; //Green

		context.lineWidth = thickness * 1.5;
		context.beginPath();

		context.moveTo(x1,y1);
		context.lineTo(x2, y2);

		context.closePath();
		context.stroke();
	}


	function cos (angle) {
		return Math.cos(deg_to_rad(angle));
	}

	function sin (angle) {
		return Math.sin(deg_to_rad(angle));
	}

	function deg_to_rad(angle){
		return angle*(Math.PI/180.0);
	}

	function random(min, max){
		return min + Math.floor(Math.random()*(max+1-min));
	}
	 
</script>

<style type="text/css">
  canvas { border: 1px solid white; }
</style>

</head>

<body>
  <canvas id="myCanvas" width="1500" height="800"></canvas>
</body>

</html>
```

![静态的树](./1.png)

然后想参照这个模板改成一颗动态的树。

## 动态的树

### 数据结构

树的单元为树干，树干的定义如下：

```javascript
var newLine = {
    childs: [], // 子树干
    angle: angle, // 生长角度
    thickness: thickness, // 树干半径
    length: length, // 树干长度
    time: 0, // 生长时间
    depth: depth, //深度
    growtime: growtime //生长时间
};
```

相比静态的树缺少了开始坐标和结束坐标，因为树干的开始位置需要根据父亲树干的结束位置确定，而结束位置根据开始位置和生长时间来确定。所以这两部分信息需要在生长过程中动态计算。

### 树干生长

树干的生长分为三个阶段：生长阶段、分枝阶段、开花阶段。

+ 生长阶段只是累积已经经过的时间到time中；
+ 若time超过growtime/2的时候，进入分枝阶段，这时候生成两个新的树干添加到树中；
+ 只有最外层的树干才有开花阶段，当最外层的树干生长完毕后，在树干结束位置画一个圆形作为花朵。

整个树干生长由一个循环控制完成。当然树干不能无限制的生长，需要限定层数，depth作为树干的层数，当depth==0时表示最外层的树干，这种树干只开花，不再进行分枝。

### 树干花朵绘制

由于树干的生长，无法确定所有树干的起始和结束位置，需要通过递归从根部开始逐步确定每个树干的开始和结束位置。伪代码如下：

```javascript
function drawTree(树干, 开始x, 开始y) {
    if (树的深度不为0) {
        根据生长时间和总长度计算结束坐标 x 和 y
        从开始和结束绘制树干

        递归绘制子树干
    } else {
        绘制花朵
    }
}
```

另外在计算结束坐标的时候，使用了 `Circ.easeOut` 缓动函数，使树干的生长呈现一种先快后慢的效果。缓动函数的选择部分，可以参考【参考文献】中提到的内容。

绘制树干只是在开始和结束位置画一条线。绘制花朵是画一个填充颜色的圆。

### 代码和效果

这里介绍了大体的思路，具体细节可以参考代码实现。

<iframe height="300" style="width: 100%;" scrolling="no" title="flower tree" src="https://codepen.io/sumy7/embed/BaroQRr?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/sumy7/pen/BaroQRr">
  flower tree</a> by sumy (<a href="https://codepen.io/sumy7">@sumy7</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

![会开花的树](./2.png)

## 总结

大体实现的效果就是这样，但是感觉性能问题也比较突出，移动设备上有卡顿，而且CPU也无缘无故的爆转。如果看官有一些想法，欢迎与我进行交流。

## 参考内容

+ [缓动函数速查表](http://easings.net/zh-cn)
+ [【html5】缓动函数在动画中的应用](https://segmentfault.com/a/1190000004670799)

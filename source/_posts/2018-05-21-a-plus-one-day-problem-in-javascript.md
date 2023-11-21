---
layout: post
title: 一个处理JavaScript日期的时候出现的问题
date: '2018-05-21 20:29:53'
categories:
  - 问题麻烦
tags:
  - javascript
  - 日期时间
---

# 一个处理JavaScript日期的时候出现的问题

好久没写博客了，有半年之久了吧。今天就之前遇到的一个bug聊一聊在用JavaScript处理日期的时候出现的一个问题。

代码需要获取startDate和endDate之间的所有间隔的天数，传入的日期格式为 `YYYY-MM-DD` 。代码的逻辑很明朗，设置开始时间，给开始时间增加天数，与结束时间相比较，直到多于结束时间为止。当时的代码如下：

```javascript
// 生成日期列表
function getDateList(startDate, endDate) {
    var datas = [];
    if (startDate == endDate) {
        var date = {};
        date.dataDate = getDate(startDate);
        datas.push(date);
    } else {
        //计算出设置的开始时间
        var myDate = new Date();
        myDate.setFullYear(startDate.split("-")[0]);
        myDate.setMonth(startDate.split("-")[1] - 1);
        myDate.setDate(startDate.split("-")[2]);

        //添加第一天
        var sd = getDate(startDate); //开始时间转换成yyyyMMdd格式
        var ed = getDate(endDate); //结束时间转换成yyyyMMdd格式
        var i = 0;
        while (sd <= ed) { //当循环到时间大于结束时间，则退出循环
            //从开始时间没循环一次增加一天
            var date = {};
            date.dataDate = sd;
            datas.push(date);
            i++;
            sd = getDate(addDate(myDate, i));
        }
    }
    return datas;
}
```

乍一看似乎没什么问题，但是就在今年的1月31日的时候，有人反馈，该代码的功能无法使用，获取的时间列表不正确，并提供了100%复现的方法。就这样开始了纠结的debug之旅。

奇怪的地方有三点：

1. 触发时间。之前一直正常，偏偏31号的时候使用不正常。
1. bug行为。表现是获取的时间列表只出现一个值。
1. 凑数用的第三点（忽略掉。。。

最后，还是通过Console的单步Debug找到的问题的所在。原来在修改日期的时候，分别赋值了年、月、日。由于修改不是一次完成，期间就会出现非法日期，浏览器会修正这个非法日期。

以今天为2018年1月31日，设置“2017-11-11”为例：

```javascript
var myDate = new Date(); // 2018-1-31
myDate.setFullYear(startDate.split("-")[0]); // 2017-1-31
myDate.setMonth(startDate.split("-")[1] - 1); // 2017-11-31 日期非法，修正到一个相邻的日期 2017-12-1
myDate.setDate(startDate.split("-")[2]); // 2017-12-11
```

我写了一个小片段，可以用来单步调试一下上述问题的过程。

<iframe height="300" style="width: 100%;" scrolling="no" title="一个日期处理问题" src="https://codepen.io/sumy7/embed/BaroMJr?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/sumy7/pen/BaroMJr">
  一个日期处理问题</a> by sumy (<a href="https://codepen.io/sumy7">@sumy7</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

解决方案也很简单，只要保证年月日一次赋值进去就可以了，最好直接的方法就是在构造函数里指定要赋值的年月日 `new Date(2017, 11, 11)` 。

就这样又消灭了一个bug，世界再次和平了。。。:smile_cat:

## 参考内容

+ [new Date() set to 31 december 2014 says 1st december instead](https://stackoverflow.com/questions/25741647/new-date-set-to-31-december-2014-says-1st-december-instead)

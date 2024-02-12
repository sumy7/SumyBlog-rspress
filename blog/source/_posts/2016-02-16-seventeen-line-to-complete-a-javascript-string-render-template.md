---
layout: post
title: 17 行代码实现的简易 Javascript 字符串模板
date: '2016-02-16 20:39:01'
categories:
  - 高效生活
tags:
  - 模板
  - javascript
---

# 17 行代码实现的简易 Javascript 字符串模板

前几天在写博客模板的时候需要用 js 将 JSON 生成网页，当时很纠结怎样优雅的实现数据的填充，因为不太想用 `+` 连接数据和HTML代码。正当纠结的时候在微博上发现了这个JavaScript字符串模板，遂拿来用了用。至于其中的各方面原理，还需要等JS水平上来之后再慢慢分析吧。当前先照葫芦画瓢。

下面是整个实现的代码，具体讲解请参考【参考文献】中的原文博客。

```javascript
function render(template, context) {

    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {  
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length, variable = variables[i]; i < length; ++i) {
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }

        return currentObject;
    })
}
```

使用方式，将代码挂在字符串的原型链下

```javascript
String.prototype.render = function (context) {
    return render(this, context);
};
```

调用方式

```javascript
render('My name is {name}'， {
    name: 'hsfzxjy'
});  // My name is hsfzxjy

render('I am in {profile.location}', {
    name: 'hsfzxjy',
    profile: {
        location: 'Guangzhou'
    }
}); // I am in Guangzhou

render('{ greeting }. \\{ This block will not be rendered }', {
    greeting: 'Hi'
}); // Hi. { This block will not be rendered }

"{greeting}! My name is { author.name }.".render({
    greeting: "Hi",
    author: {
        name: "hsfzxjy"
    }
});
// Hi! My name is hsfzxjy.
```

感谢博主提供的黑科技，有了这么方便的功能。

## 参考内容

+ [17 行代码实现的简易 Javascript 字符串模板（SegmentFault）](https://segmentfault.com/a/1190000004428305)
+ [17 行代码实现的简易 Javascript 字符串模板（博客）](http://hsfzxjy.github.io/a-simple-javascript-template-language/)

---
layout: post
title: 解析用户输入表达式的值，简易的JS沙箱
date: '2021-03-22 23:42:01'
categories:
  - 果然还是前端
tags:
  - javascript
  - expression
  - 表达式
  - 沙箱
reference:
  - url: >-
      https://github.com/vuejs/vue/blob/78c3ce0ce0c2230f657cb7772a84fc7aa7ce0825/src/core/instance/proxy.js#L9
    title: proxy.js-vuejs-Github
---

有时候我们需要解析用户输入的表达式，用户输入的表达式千奇百怪，如何控制只能使用指定的函数，制作一个简易的沙箱环境？

参考Vue的代码，实现以下效果：

1. 获取用户输入表达式字符串的值
2. 只能访问指定对象上的值
3. 不能访问global/window上定义的变量属性

代码及测试代码如下：

```javascript
function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }

    return expectsLowerCase ?
        function (val) {
            return map[val.toLowerCase()];
        } :
        function (val) {
            return map[val];
        }
}

var allowedGlobal = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require');

var hasHandler = {
    has: function has(target, key) {
        const hasKey = key in target;
        const isAllowed = allowedGlobal(key);
        return hasKey || !isAllowed;
    }
};

var vm = {
    foo: -1
};

var vm = new Proxy(vm, hasHandler);

var buildFunction = function (vm, expression) {
    var fun = new Function("vm", `
        with(vm) {
            return ${expression};
        }
    `);
    return function () {
        return fun(vm);
    };
}

// 尝试访问vm上的foo对象，和全局定义的Math对象
var okExpression = 'Math.abs(foo)';
var okEval = buildFunction(vm, okExpression);
okEval();

// 尝试访问全局的test_foo
window.test_foo = "Hello there";
var errExpression = 'test_foo || window.test_foo';
var errEval = buildFunction(vm, errExpression);
errEval();
```

稍微解释一下原理：使用JS的Proxy代理，hasHandler用于拦截判断某个属性是否存在对象上的操作。这里用到了Proxy的两个拦截器——`has` 和 `get`。`has` 用于表明给定的属性是否在该对象内，如果不在引擎会尝试向外层作用于查找。`get` 用于从查找到的作用于里获取对应属性的值。

这里使用了 `has` 进行拦截操作：

+ 如果访问的属性已经存在vm对象上，则 `has` 直接声明存在当前对象上
+ 如果属性不在vm对象上，但是在allowedGlobal中，则 `has` 声明变量不在该对象上，引擎会往外层作用域查找，最终找到window/global对象上的属性
+ 如果属性不在vm对象上，也不在allowedGlobal中，则 `has` 声明变量在该对象上，拦截引擎的外层作用域查找操作。后续通过 `get` 在当前对象返回属性值时只能获取到 **undefined**，达到拦截对window/global属性访问的目的

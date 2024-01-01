---
title: 模块中默认导出和命名导出的区别
date: 2023-12-28 12:00:00
categories: [果然还是前端]
tags: [javascript, es6, module, export, default]
---

# 模块中默认导出和命名导出的区别

最近碰到一个循环依赖的问题，看了下编译后的webpack模块，发现webpack对不同默认导出方式的处理是不同的，跟之前认为的有出入，于是记录一下。

之前觉得在模块中，导出的内容是不可变的，比如导出了一个变量，那么这个变量就是导出时候的内容；如果导出的是一个函数，那么这个函数也是导出函数的引用。

但是实际上，这个并不是绝对的，这个内容可变性取决于导出的方式。

## 导出的是引用，不是值

在一个模块中，通过命名导出了一个变量 `thing`。并在 500ms 后修改了这个变量的值。

```javascript
// module.js
export let thing = 'initial';

setTimeout(() => {
  thing = 'changed';
}, 500);
```

那么我们在引用这个变量的时候，会发现这个变量的值是会跟随变化的。

```javascript
// main.js
import { thing as importedThing } from './module.js';
const module = await import('./module.js');
let { thing } = await import('./module.js');

setTimeout(() => {
  console.log(importedThing); // "changed"
  console.log(module.thing); // "changed"
  console.log(thing); // "initial"
}, 1000);
```

导入的时候，相当于 `引用` 了原有模块的变量，这个特性类似于单向绑定。
但是解构赋值是不同的，因为解构的时候已经将变量的值取出来赋予了新的变量，所以不会跟随变化。

## 默认导出是不同的

类似的有一个默认导出的模块，并在 500ms 后修改了默认导出的值。

```javascript
// module.js
let thing = 'initial';

export { thing };
export default thing;

setTimeout(() => {
  thing = 'changed';
}, 500);
```

通过模块的 `default` 入口获取对应的值

```javascript
// main.js
import { thing, default as defaultThing } from './module.js';
import anotherDefaultThing from './module.js';

setTimeout(() => {
  console.log(thing); // "changed"
  console.log(defaultThing); // "initial"
  console.log(anotherDefaultThing); // "initial"
}, 1000);
```

可以发现，不管是具名引用了default还是直接导入了default，获取到的值都是不会变的。

这是因为 `export default` 类似于一个表达式，它在导出的时候就已经确定了值，而不是一个引用。后续不管怎么变化，都只会是执行语句时候的值。

但是需要注意的是，如果是通过 `export { thing as default }` 这种命名导出方式导出了默认出口，那么这个值是会跟随变化的。

```javascript
// module.js
let thing = 'initial';

export { thing, thing as default };

setTimeout(() => {
  thing = 'changed';
}, 500);
```

```javascript
// main.js
import { thing, default as defaultThing } from './module.js';
import anotherDefaultThing from './module.js';

setTimeout(() => {
  console.log(thing); // "changed"
  console.log(defaultThing); // "changed"
  console.log(anotherDefaultThing); // "changed"
}, 1000);
```

原因嘛，可以参考上一节的说明。

## 其它的说明

除了这些，还有一些其它的“微小”的特例，比如：

### 默认导出的是个函数

前面说到，`export default` 是一个表达式，那么如果这个表达式是一个函数呢？

```javascript
// module.js
export default function thing() {}

setTimeout(() => {
  thing = 'changed';
}, 500);
```

```javascript
// main.js
import thing from './module.js';

setTimeout(() => {
  console.log(thing); // "changed"
}, 1000);
```

可以发现，这个值居然会发生变化。这说明默认导出的如果是一个函数，导出的时候就变成了一个引用而不是值。这跟之前的说明又发生了些出入。

这是因为，如果导出的是函数表达式的值的话，在导出的时候无法确定这个值是什么，所以只能特殊处理一下导出一个引用。

```javascript
// module1.js
// 函数定义
function someFunction() {}
class SomeClass {}

console.log(typeof someFunction); // "function"
console.log(typeof SomeClass); // "function"

// module2.js
// 函数表达式
(function someFunction() {});
(class SomeClass {});

console.log(typeof someFunction); // "undefined"
console.log(typeof SomeClass); // "undefined"
```

不得不说，JavaScript 真是一门神奇的语言。

### 模块循环依赖

最后，再说一下最开始提到的循环依赖的问题。在讲循环依赖之前，简单复习一下变量提升。

通过 `function` 直接定义，或者 `var` 定义的变量，都会被提升到当前作用域的顶部。

```javascript
thisWorks();

function thisWorks() {
  console.log('yep, it does');
}

var foo = 'bar';

function test() {
    console.log(foo); // undefined
    var foo = 'hello';
}

test();
```

`let`/`const`/`class` 定义的变量，不会被提升，所以在使用之前必须先定义。

```javascript
// Doesn't work
assignedFunction();
// Doesn't work either
new SomeClass();

const assignedFunction = function () {
  console.log('nope');
};
class SomeClass {}
```

回到模块循环依赖的问题，假设有两个模块，`moduleA` 和 `moduleB`，它们互相依赖。

```javascript
// moduleA.js
import { foo } from './module.js';

foo();

export function hello() {
  console.log('hello');
}

// moduleB.js
import { hello } from './main.js';

hello();

export function foo() {
    console.log('foo');
}
```

这样是没有问题的，因为变量提升的原因，`moduleA` 中的 `foo` 函数在 `moduleB` 中是可以使用的。

但是如果不满足变量提升的条件，模块就会报错。

```javascript
// moduleA.js
import { foo } from './module.js';

foo();

export const hello = () => console.log('hello');

// moduleB.js
import { hello } from './main.js';

hello();

export const foo = () => console.log('foo');
```

这样就会报错，在引用另一个文件的时候，因为不满足变量提升的条件，引用了未初始化的变量而报错。

## 参考内容

- [Understanding the Difference between export default and export with Named Exports in JavaScript | by Hesh Ramsis ( Hesham El Masry 77 ) | Medium](https://medium.com/@heshramsis/understanding-the-difference-between-export-default-and-export-with-named-exports-in-javascript-f0569c221a3)
- [`export default thing` is different to `export { thing as default }` - JakeArchibald.com](https://jakearchibald.com/2021/export-default-thing-vs-thing-as-default/)

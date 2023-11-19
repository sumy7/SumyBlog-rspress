---
layout: post
title: trove4j大数据环境下的Collections库
date: '2015-12-24 22:08:04'
categories:
  - 编程语言
tags:
  - java
  - collections
  - 库
reference:
  - url: 'https://greatpowerlaw.wordpress.com/2012/09/29/trove4j-2/'
    title: 'trove4j:大数据下的轻量Java Collections库'
  - url: 'https://greatpowerlaw.wordpress.com/2013/04/08/fastutil-vs-trove4j/'
    title: Fastutil vs. Trove4j
  - url: 'http://www.javamex.com/tutorials/memory/object_memory_usage.shtml'
    title: 'Memory usage of Java objects: general guide'
---

平安夜快乐。。。今天在写词分析的器的时候，发现了一个问题。由于要计算两个词之间的cos距离，需要保存向量，于是将数据结构设计成`Map<Stirng, Set<Integer>>`。数据结构问题解决了，但是数据文本有2G多，程序加载数据到一半就GC了。
刚开始还以为是数据太大的原因，之后去StackOverflow上稍微搜索了一下，有人提到了一种[答案](http://stackoverflow.com/a/10634926/3671444)，感觉比较靠谱，尝试了一下果然可以。

# trove4j

根据上面回答中提到的内容，按图索骥找到了这个库。trove4j支持原生类型，这与Java的Collections只能使用包装类型不同。原生类型比包装类型更节省空间。这在大数据环境下是很必要的。
例如，上面的`Map<Stirng, Set<Integer>>`就可以写成

```java
Map<String, TIntSet> map = new HashMap<String, TIntHashSet>();
```

基本的操作方法与Java原生Collections中的方法大体相同。
在使用中发现的一点不同就是迭代器的不同，trove4j为每种类型单独定义了迭代器。

```java
TIntIterator iter = list.iterator();
while(iter.hasNext()){
    int a = iter.next();
    ...
}
```

这样可以让迭代器更好的返回原生类型。

# 为什么

Java默认的Collections为什么消耗内存，这就需要从Java的Class结构开始说起。
这里简单说一下Class各部分的内存占用大小（以32位为例）：

+ **Obejct Header** 包括一些简单的信息
+ **Primitive Fields** 原生类型占用，根据它们的大小分配
+ **Reference Fields** 引用类型占用，统一为4字节
+ **Padding** 占位符，用来补齐进行内存对其

**Object Header** 普通的类需要8个字节，数组需要12个字节（8个字节的类+4个字节的数组长度）。
**Primitive Fields** 的占用如下表

|Java type|Bytes required|
|---|---|
|boolean|1|
|byte|1|
|char|2|
|short|2|
|int|4|
|float|4|
|long|8|
|double|8|

那么一个普通的Double类在32位上占用的空间为：
> 8字节头部
> 8字节double
> 0字节对齐
总共占用16字节的长度。

这里只是大体看了一下，具体计算方法还要继续研究。

# 其它

在文章中还提到了一个叫Fastutil的库，似乎比trove4j更好，但是trove4j更轻量级，有空再看看。

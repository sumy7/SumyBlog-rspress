---
layout: post
title: 单例模式及单例模式实践
date: '2015-12-27 22:14:08'
categories:
  - 编程语言
tags:
  - java
  - 设计模式
  - 单例模式
reference:
  - url: 'http://callmegod.iteye.com/blog/1474441'
    title: 枚举类型的单例模式(java)
  - url: >-
      http://wuchong.me/blog/2014/08/28/how-to-correctly-write-singleton-pattern/
    title: 如何正确地写出单例模式
  - url: 'http://www.cnblogs.com/aigongsi/archive/2012/04/01/2429166.html'
    title: java中volatile关键字的含义
---

单例模式应用广泛，而且是我最喜欢的模式。简单介绍一下单例模式吧。

单例模式保证只有一个实例，每次取到的都是同一个实例。基本方法是将构造函数设为私有，并导出公有的静态成员。

# 标准单例

## 懒汉式

`懒汉式`在类初始化时就实例化一个对象。

```java
public class Singleton {
    private static final Singleton _instance = new Singleton();
    private Singleton(){
    }

    public static Singleton getInstance(){
        return _instance;
    }
}
```

## 饿汉式

`饿汉式`只有真正需要对象的时候才开始实例化对象。

```java
public class Singleton {
    private static final Singleton _instance = null;
    private Singleton(){
    }

    public static Singleton getInstance(){
        if(_instance==null){
            _instance = new Singleton();
        }
        return _instance;
    }
}
```

# 单例的线程安全

上面的两种写法对于普通情况下就挺好的，但是在复杂情况下，容易出现一些问题。下面考虑多线程情况下如何进行。

## 懒汉式，线程安全

对于懒汉式，只要保证`getInstance()`方法是线程安全的即可。

```java
public static synchronized Singleton getInstance() {
    if (instance == null) {
        instance = new Singleton();
    }
    return instance;
}
```

但是这样效率比较低，每次只能有一个线程取到对象。由于只需要在创建对象的时候保证同步，所以就引出了双重检验所的方式

```java
// why not safe?
public static Singleton getSingleton() {
    if (instance == null) {                         //Single Checked
        synchronized (Singleton.class) {
            if (instance == null) {                 //Double Checked
                instance = new Singleton();
            }
        }
    }
    return instance ;
}
```

这样写虽然看起来很美妙，但是却不是线程安全的。原因在于`instance = new Singleton();`这个语句不是原子操作。大体上JVM在初始化对象的时候会进行以下操作：

1. 给 instance 分配内存
2. 调用 Singleton 的构造函数来初始化成员变量
3. 将 instance 对象指向分配的内存空间（执行完这步instance就为非`null`了）

但是JVM的编译器可能存在指令重排序的问题。也就是说上面的顺序不能保证是`1-2-3`。如果顺序是`1-3-2`，在执行完`3`后，被其它线程抢占了，这是由于instance是非null（但没有初始化），第一次check返回false，所以线程二回直接返回instance，然后使用时可能就会出现错误。

所以需要将instance变量声明成`volatile`即可。

```java
public class Singleton {
    private volatile static Singleton instance; //声明成 volatile
    private Singleton (){}

    public static Singleton getSingleton() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

提到了`volatile`不得不再说明一下。我对这个关键字也不是很了解，也只能说个大概。
[维基百科](https://zh.wikipedia.org/wiki/Volatile%E5%8F%98%E9%87%8F)里写到

> 当volatile用于一个作用域时，Java保证如下：
> 1. （适用于Java所有版本）读和写一个volatile变量有全局的排序。也就是说每个线程访问一个volatile作用域时会在继续执行之前读取它的当前值，而不是（可能）使用一个缓存的值。(但是并不保证经常读写volatile作用域时读和写的相对顺序，也就是说通常这并不是有用的线程构建)。
> 2. （适用于Java5及其之后的版本）volatile的读和写建立了一个happens-before关系，类似于申请和释放一个互斥锁。
>
> 使用volatile会比使用锁更快，但是在一些情况下它不能工作。volatile使用范围在Java5中得到了扩展，特别是双重检查锁定现在能够正确工作。

用volatile修饰的变量，线程在每次使用变量的时候，都会读取变量修改后的最的值。volatile很容易被误用，用来进行原子性操作。
这里使用volatile的原因是：禁止指令重排序优化。JVM在编译的时候会尽量避免重排优化用volatile修饰的变量的读写指令，是读操作避免优化到写操作之前。这样保证了时间顺序的正确性。

所以，对于关键字`volatile`的具体使用有待深入研究，这里也不过多讨论了。

## 饿汉式，线程安全

饿汉式由于是静态变量形式，本来就是线程安全的。

# 复杂单例

除了上面的通常写法，这里还有一些复杂的写法，主要是通过Java数据结构的特性来保证单例的正常实现。

## 静态内部类

静态内部类的线程安全是通过JVM本身的机制来保证的。

```java
public class Singleton {  
    private static class SingletonHolder {  
        private static final Singleton INSTANCE = new Singleton();  
    }  
    private Singleton (){}  
    public static final Singleton getInstance() {  
        return SingletonHolder.INSTANCE; 
    }  
}
```

> 由于 SingletonHolder 是私有的，除了 getInstance() 之外没有办法访问它，因此它是懒汉式的；同时读取实例的时候不会进行同步，没有性能缺陷；也不依赖 JDK 版本。

## 单元素枚举型单例

通常使用下面的方式声明

```java
public enum EasySingleton{
    INSTANCE;
}
```

这样直接可以通过`EasySingleton.INSTANCE`来访问实例。

单元素枚举型单例不仅写法简单，而且这样有三个好处：

1. 线程安全
2. 不会因为序列化而产生新实例
3. 防止反射攻击

可以说：**单元素的枚举类型已经成为实现Singleton的最佳方法**。

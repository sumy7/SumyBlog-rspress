---
layout: post
title: Java类StringTokenizer的说明
date: '2013-04-27 00:00:00'
categories:
  - 编程语言
tags:
  - java
  - 姿势
---

# Java类StringTokenizer的说明

> 看起来 StringTokenizer 类好神奇的样子，不管有没有用先了解了解再说。

## 声明

> **java.util**
> **类StringTokenizer**
> java.lang.object
> ┖java.util.StringTokenizer

所有已实现的接口：

Enumeration&lt;Object>

StringTokenizer 是一个用来分隔 String 的应用类，相当于 VB 的 split 函数。

string tokenizer 类允许应用程序将字符串分解为标记。tokenization 方法比 StreamTokenizer 类所使用的方法更简单。StringTokenizer 方法不区分标识符、数和带引号的字符串，它们也不识别并跳过注释。

## 方法声明

### 构造函数

```java
public StringTokenizer(String str)
public StringTokenizer(String str, String delim)
public StringTokenizer(String str, String delim, boolean returnDelims)
```

第一个参数就是要分隔的 String ，第二个是分隔字符集合，第三个参数表示分隔符号是否作为标记返回，如果不指定分隔字符，默认的是：`\t\n\r\f`

### 核心方法

```java
public boolean hasMoreTokens()
public String nextToken()
public String nextToken(String delim)
public int countTokens()
```

其实就是三个方法，返回分隔字符块的时候也可以指定分割符，而且以后都是采用最后一次指定的分隔符号。

### 多余方法

```java
public boolean hasMoreElements()
public boolean hasMoreElements()
```

这个类实现了 Enumeration 接口，所以多了这么两个方法，其实根本没有必要实现这个接口
它的名字就叫 StringTokenizer ，返回一个 Object 就没有什么意思了。

## 方法说明

### 构造函数

1. `StringTokenizer(String str)`：构造一个用来解析str的StringTokenizer对象。java默认的分隔符是“空格”、“制表符(‘\t’)”、“换行符(‘\n’)”、“回车符(‘\r’)”。
2. `StringTokenizer(String str, String delim)`：构造一个用来解析str的StringTokenizer对象，并提供一个指定的分隔符。
3. `StringTokenizer(String str, String delim, boolean returnDelims)`：构造一个用来解析str的StringTokenizer对象，并提供一个指定的分隔符，同时，指定是否返回分隔符。

### 方法

说明：

1. 所有方法均为 public；
2. 书写格式 Style：`［修饰符］　<返回类型><方法名（［参数列表］）>`

如：`static int parseInt(String s)` 表示：此方法（parseInt）为类方法（static），返回类型为（int），方法所需参数为String类型。

1. `int countTokens()`：返回nextToken方法被调用的次数。如果采用构造函数1和2，返回的就是分隔符数量(例2)。
2. `boolean hasMoreTokens()` ：返回是否还有分隔符。
3. `boolean hasMoreElements()` ：结果同2。
4. `String nextToken()`：返回从当前位置到下一个分隔符的字符串。
5. `Object nextElement()` ：结果同4。
6. `String nextToken(String delim)`：与4类似，以指定的分隔符返回结果。

例1：

代码:

```java
String s = new String("The Java platform is the ideal platform for network computing");
StringTokenizer st = new StringTokenizer(s);
System.out.println( "Token Total: " + st.countTokens() );
while( st.hasMoreElements() ){
    System.out.println( st.nextToken() );
}
```

结果为：

```text
Token Total: 10
The
Java
platform
is
the
ideal
platform
for
network
computing
```

例2:

代码:

```java
String s = new String("The=Java=platform=is=the=ideal=platform=for=network=computing");
StringTokenizer st = new StringTokenizer(s,"=",true);
System.out.println( "Token Total: " + st.countTokens() );
while( st.hasMoreElements() ){
	System.out.println( st.nextToken() );
}
```

结果为：

```text
Token Total: 19
The
=
Java
=
platform
=
is
=
the
=
ideal
=
platform
=
for
=
network
=
computing
```

## 参考内容

+ [StringTokenizer类的使用 - riyunzhu的专栏](http://blog.csdn.net/riyunzhu/article/details/7989145)
+ [类 StringTokenizer - Rollen Holt](http://www.cnblogs.com/rollenholt/articles/2033801.html)

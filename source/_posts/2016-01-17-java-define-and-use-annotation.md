---
layout: post
title: Java注解及自定义注解入门
date: '2016-01-17 22:52:12'
categories:
  - 编程语言
tags:
  - java
  - 注解
  - annotation
reference:
  - url: 'http://www.importnew.com/17413.html'
    title: Java注解教程及自定义注解
  - url: 'http://www.importnew.com/10294.html'
    title: Java中的注解是如何工作的？
---

在编写Java代码中，我们可以经常可以看到注解的身影，常用的注解如`@Override` `@Deprecated`都不会太陌生。但是注解内部是如何工作的，这部分内容需要进一步去探究。

# 注解

注解可以理解为注释和解释，是一种对方法、变量等地方的一种标注形式。我们可以理解为通过使用注解为代码附带了额外的信息。

> Annotation是一种应用于类、方法、参数、变量、构造器及包声明中的特殊修饰符。它是一种由JSR-175标准选择用来描述元数据的一种工具。

## 内建注解

Java提供了三种内建注解：

1. **@Override** 当我们想要复写父类中的方法时，我们需要使用该注解去告知编译器我们想要复写这个方法。这样一来当父类中的方法移除或者发生更改时编译器将提示错误信息。
2. **@Deprecated** 当我们希望编译器知道某一方法不建议使用时，我们应该使用这个注解。Java在 javadoc 中推荐使用该注解，我们应该提供为什么该方法不推荐使用以及替代的方法。
3. **@SuppressWarnings** 这个仅仅是告诉编译器忽略特定的警告信息，例如在泛型中使用原生数据类型。它的保留策略是**SOURCE**并且被编译器丢弃。

## 元注解

元注解用来注解其它注解，标明注解的一些属性。有四种类型的元注解：

1. **@Documented** 指明拥有这个注解的元素可以被javadoc此类的工具文档化。这种类型应该用于注解那些影响客户使用带注释的元素声明的类型。如果一种声明使用Documented进行注解，这种类型的注解被作为被标注的程序成员的公共API。
2. **@Target** 指明该类型的注解可以注解的程序元素的范围。该元注解的取值可以为TYPE,METHOD,CONSTRUCTOR,FIELD等。如果Target元注解没有出现，那么定义的注解可以应用于程序的任何元素。
3. **@Inherited** 指明该注解类型被自动继承。如果用户在当前类中查询这个元注解类型并且当前类的声明中不包含这个元注解类型，那么也将自动查询当前类的父类是否存在Inherited元注解，这个动作将被重复执行知道这个标注类型被找到，或者是查询到顶层的父类。
4. **@Retention** 指明了该Annotation被保留的时间长短。RetentionPolicy取值为SOURCE,CLASS,RUNTIME。

# 自定义注解

要创建自定义注解，需要注意以下问题：

+ 注解方法不能带有参数；
+ 注解方法返回值类型限定为：基本类型、String、Enums、Annotation或者是这些类型的数组；
+ 注解方法可以有默认值；
+ 注解本身能够包含元注解，元注解被用来注解其它注解。

这里参照一个自定义注解的例子：

```java
package com.journaldev.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Target(ElementType.METHOD)
@Inherited
@Retention(RetentionPolicy.RUNTIME)
    public @interface MethodInfo{
    String author() default 'Pankaj';
    String date();
    int revision() default 1;
    String comments();
}
```

在定义完注解之后，就可以在代码中使用自定义注解了。下面的例子包含了内置注解和自定义注解。

```java
package com.journaldev.annotations;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

public class AnnotationExample {

    public static void main(String[] args) {
    }

    @Override
    @MethodInfo(author = 'Pankaj', comments = 'Main method', date = 'Nov 17 2012', revision = 1)
    public String toString() {
        return 'Overriden toString method';
    }

    @Deprecated
    @MethodInfo(comments = 'deprecated method', date = 'Nov 17 2012')
    public static void oldMethod() {
        System.out.println('old method, don't use it.');
    }

    @SuppressWarnings({ 'unchecked', 'deprecation' })
    @MethodInfo(author = 'Pankaj', comments = 'Main method', date = 'Nov 17 2012', revision = 10)
    public static void genericsTest() throws FileNotFoundException {
        List l = new ArrayList();
        l.add('abc');
        oldMethod();
    }
}
```

这里使用注解的方式只是让方法带上了数据，而这些数据具体有什么用，带上数据的方法需要怎么处理还需要另外的代码逻辑来实现。
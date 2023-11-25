---
layout: post
title: 注解进阶：解析注解
date: '2016-01-19 19:47:34'
categories:
  - 编程语言
tags:
  - java
  - annotation
  - 注解
---

# 注解进阶：解析注解

上篇介绍了注解的基本知识和自定义注解，这篇文章来介绍如何在运行时解析注解。通过反射可以获得一些注解的信息，根据这些信息就可以进行一些操作。

# 注解定义

要在运行时获得注解的信息，需要将注解的保留策略设置为`RUNTIME`。首先写一个测试用例。

```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface Info {
    String name();

    String[] author();

    String comment();
}
```

定义一个`Info`注解，适用于任何变量、类、方法，保留策略为**运行时**。

然后需要一个被注解标注的类：

```java
@Info(name = "class-InfoClass", author = { "sumy",
        "noclyt" }, comment = "Use to holding username")
public class InfoClass {

    @Info(name = "var-name", author = { "sumy" }, comment = "username")
    private String name;

    @Info(name = "<Aconstructor>", author = {}, comment = "constructor")
    public InfoClass(String name) {
        this.name = name;
    }

    @Info(name = "method-getName", author = {
            "noclyt" }, comment = "a method use to getting username")
    public String getName() {
        return name;
    }
}
```

定义了一个类，并用注解为类和类中的成员标注了信息。

# 解析注解

上面已经定义好了注解和使用注解的类，下面尝试获取注解的信息。

```java
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;

public class TestAnnotation {
    public static void main(String[] args) {
        // 获取类的注解信息
        for (Annotation annotation : InfoClass.class.getAnnotations()) {
            System.out.println("class annotation: " + annotation.toString());
        }

        // 获取变量的注解信息
        for (Field field : InfoClass.class.getDeclaredFields()) {
            // 遍历获取所有注解
            for (Annotation anno : field.getDeclaredAnnotations()) {
                System.out.println("field annotation: " + anno.toString());
            }
        }

        // 获取方法的注解信息
        for (Method method : InfoClass.class.getMethods()) {
            if (method.isAnnotationPresent(Info.class)) { // 判断Info注解是否存在于这个方法
                // 获取指定类型的注解
                Info infoanno = method.getAnnotation(Info.class);
                System.out.println("method annoation: " + infoanno.toString());
                System.out.println(
                        "method " + method.getName() + "'s author(s) is/are "
                                + Arrays.toString(infoanno.author()));
            }
        }
    }
}
```

运行结果：

```
class annotation: @Info(name=class-InfoClass, author=[sumy, noclyt], comment=Use to holding username)
field annotation: @Info(name=var-name, author=[sumy], comment=username)
method annoation: @Info(name=method-getName, author=[noclyt], comment=a method use to getting username)
method getName's author(s) is/are [noclyt]
```

这样就通过基本的反射方法获取了注解信息。注解API非常强大，被广泛应用于各种Java框架，如Spring，Hibernate，JUnit等。

## 参考内容

+ [Java注解教程：自定义注解示例，利用反射进行解析](http://www.importnew.com/14479.html)

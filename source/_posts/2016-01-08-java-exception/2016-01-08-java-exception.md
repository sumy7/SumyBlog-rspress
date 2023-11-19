---
layout: post
title: 由一个小例子引出的Java异常处理机制
date: '2016-01-08 22:54:50'
categories:
  - 编程语言
tags:
  - java
  - 异常
  - exception
reference:
  - url: 'http://www.importnew.com/14688.html'
    title: 深入理解java异常处理机制
---

大家对java异常处理可能再熟悉不过了，java很大一部分就是在与异常打交道，`try...catch...finally`再熟悉不过了。但是之前遇到了一个例子发现，原来异常处理并不是如我们想象那样如线性那么简单。

# 引例

想过没有，如果在`catch`之后，`throw`与`return`的逻辑是怎样的？

```java
public class Test {
    public boolean testException() throws Exception {
        boolean flag = true;
        try {
            produceException();
            return flag;
        } catch (Exception e) {
            System.out.println("catch exception");
            flag = false;
            throw e;
        } finally {
            System.out.println("finally flat=" + flag);
            return flag; // #去掉？
        }
    }

    public void produceException() throws Exception {
        throw new Exception("a exception");
    }

    public static void main(String[] args) {
        Test test = new Test();
        try {
            boolean flag = test.testException();
            System.out.println(flag);
        } catch (Exception e) {
            System.out.println("main catch exception");
            e.printStackTrace();
        }
    }
}
```

输出结果是

```
catch exception
finally flat=false
false
```

从这里可以看出`throw`没有终止`return`的执行，但是`return`却把`throw`抛出的异常给去掉了。如果把`return`去掉的话，异常就可以正常抛出了。

再考虑一个复杂的例子

```java
public class TestException {
    public TestException() {
    }

    boolean testEx() throws Exception {
        boolean ret = true;
        try {
            ret = testEx1();
        } catch (Exception e) {
            System.out.println("testEx, catch exception");
            ret = false;
            throw e;
        } finally {
            System.out.println("testEx, finally; return value=" + ret);
            return ret;
        }
    }

    boolean testEx1() throws Exception {
        boolean ret = true;
        try {
            ret = testEx2();
            if (!ret) {
                return false;
            }
            System.out.println("testEx1, at the end of try");
            return ret;
        } catch (Exception e) {
            System.out.println("testEx1, catch exception");
            ret = false;
            throw e;
        } finally {
            System.out.println("testEx1, finally; return value=" + ret);
            return ret;
        }
    }

    boolean testEx2() throws Exception {
        boolean ret = true;
        try {
            int b = 12;
            int c;
            for (int i = 2; i >= -2; i--) {
                c = b / i;
                System.out.println("i=" + i);
            }
            return true;
        } catch (Exception e) {
            System.out.println("testEx2, catch exception");
            ret = false;
            throw e;
        } finally {
            System.out.println("testEx2, finally; return value=" + ret);
            return ret;
        }
    }

    public static void main(String[] args) {
        TestException testException1 = new TestException();
        try {
            testException1.testEx();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

这个有点复杂，输出结果是

```
i=2
i=1
testEx2, catch exception
testEx2, finally; return value=false
testEx1, finally; return value=false
testEx, finally; return value=false
```

# Java异常

{% asset_img 1.jpg Java异常 %}
Java中所有的异常都有一个共同的祖先`Throwable`，从这个祖先分出两个大分支`Error`和`Exception`。

+ **Error**：是程序无法处理的错误，表示运行应用程序中较严重问题。大多数错误与代码编写者执行的操作无关，而表示代码运行时 JVM（Java 虚拟机）出现的问题。例如，Java虚拟机运行错误（Virtual MachineError），当 JVM 不再有继续执行操作所需的内存资源时，将出现 OutOfMemoryError。这些异常发生时，Java虚拟机（JVM）一般会选择线程终止。
+ **Exception**：是程序本身可以处理的异常。Exception又分为RuntimeException和其它。
    + `RuntimeException`是运行时异常，如NullPointerException(空指针异常)、IndexOutOfBoundsException(下标越界异常)等。这些异常在编码阶段无法检查，只有在运行时才能发现。一般这类异常都是由于逻辑错误引起的，Java编译器不会检查它，所以说不需要用`try-catch`对其进行捕获，编译器也能编译通过。
    + 其它是那些非运行时异常，这些异常都是在编码阶段需要考虑到的，如果没有正确处理，编译不会通过。

# Java异常处理机制

Java异常处理机制为：抛出异常、捕获异常。当异常发生时，运行时系统会寻找异常的解决方案，若当前方法没有能力解决该异常，异常会被抛向上一级继续寻找，直到找到该异常的解决方案或者异常到达了Java虚拟机。此时Java虚拟机会终止程序的运行，并打印异常的堆栈信息。

> 一个方法所能捕捉的异常，一定是Java代码在某处所抛出的异常。简单地说，异常总是先被抛出，后被捕捉的。

## 抛出异常

当一个方法出现错误的时候就会抛出异常，产生异常通常有两种方式：手动生成异常对象，通过`throw`方法交付运行时系统；由运行时系统自动生成并交付异常。

**手动抛出**
使用`throw`方法可以手动生成异常并抛出

```java
throw new exceptionname(...);
```

这里的exceptionname可以是自定义的异常类或系统已有的异常类。throw能抛出的必须是`Throwable`的对象或子类对象，不能抛出任意对象。

**向上抛出**

前面说到，当异常抛出时，运行时系统会寻找异常的解决方案。如果当前方法没有能力（或没有必要）解决该异常，则需要将该异常抛出到调用该方法的上一级。方法是在方法定义的时候声明该方法无法（没必要）处理而需要向上抛出的异常。

```java
methodname throws Exception1,Exception2,..,ExceptionN (...){
    ...
}
```

多个异常之间使用逗号分隔，用`throws`关键字声明。

## 捕获异常

在java中通过`try-catch`捕获异常，一般语法形式为：

```java
try {  
    // 可能会发生异常的程序代码  
} catch (Type1 id1){  
    // 捕获并处置try抛出的异常类型Type1  
} catch (Type2 id2){  
    // 捕获并处置try抛出的异常类型Type2  
}
```

`try`后可以与多个`catch`块并列，当异常抛出时，java会依次检查catch语句块的类型，若相符则交给该语句块处理。
这里需要注意两个问题，一是**依次**，检查顺序是从上向下，若找到匹配的则不再继续向下检查，未找到匹配的则向上抛出；二是**匹配**，什么样子的算匹配？抛出异常的类型与要catch的类型一致或是其子类时就算是匹配了。
还需要注意catch语句的排序问题，尽量按照从子类到父类的顺序排放，否则父类类型会截获抛出的异常导致子类类型的catch永远无法参与处理。

讲到了`try-catch`语句块，再说一下`try-catch-finally`语句块：

```java
try {  
    // 可能会发生异常的程序代码  
} catch (Type1 id1) {  
    // 捕获并处理try抛出的异常类型Type1  
} catch (Type2 id2) {  
    // 捕获并处理try抛出的异常类型Type2  
} finally {  
    // 无论是否发生异常，都将执行的语句块  
}
```

finally语句表示无论是否出现异常，都应当执行里面的内容。
在以下4种特殊情况下，finally块不会被执行：

1. 在finally语句块中发生了异常。
2. 在前面的代码中用了System.exit()退出程序。
3. 程序所在的线程死亡。
4. 关闭CPU。

讲到这里我突然想到一个问题，如果try中出现了没有被catch的异常，finally还会被执行吗？
考虑下面的例子

```java
public class TestFinally {
    public void test(){
        try{
            throw new RuntimeException();
        }catch(NullPointerException e){

        }finally{
            System.out.println("In finally");
        }
    }

    public static void main(String[] args){
        TestFinally test = new TestFinally();
        test.test();
    }
}
```

输出结果

```
In finally
Exception in thread "main" java.lang.RuntimeException
	at TestFinally.test(TestFinally.java:7)
	at TestFinally.main(TestFinally.java:17)
```

可以发现`finally`语句块里的代码还是被执行了。结合引例中的例子，抛出异常不同于`return`直接终止后面语句，而是需要处理完“本层”的事务。发现异常-匹配catch处理异常-处理finally-抛出未处理的异常。

## 总结

try、catch、finally语句块的执行顺序：

1. 当try没有捕获到异常时：try语句块中的语句逐一被执行，程序将跳过catch语句块，执行finally语句块和其后的语句；
2. 当try捕获到异常，catch语句块里没有处理此异常的情况：当try语句块里的某条语句出现异常时，而没有处理此异常的catch语句块时，此异常将会抛给JVM处理，finally语句块里的语句还是会被执行，但finally语句块后的语句不会被执行；
3. 当try捕获到异常，catch语句块里有处理此异常的情况：在try语句块中是按照顺序来执行的，当执行到某一条语句出现异常时，程序将跳到catch语句块，并与catch语句块逐一匹配，找到与之对应的处理程序，其他的catch语句块将不会被执行，而try语句块中，出现异常之后的语句也不会被执行，catch语句块执行完后，执行finally语句块里的语句，最后执行finally语句块后的语句；

{% asset_img 2.jpg  图示try、catch、finally语句块的执行 %}

# 自定义异常类

Java包含了一些内置的异常类，可以用来表示内部出现的异常。除了使用Java内置的异常类，也可以自定义自己的异常类。
自定义的异常类需要继承Exception或RuntimeException，然后在相应位置抛出自定义异常类的对象；可以在当前位置使用`try-catch`处理异常，或者不处理用`throws`关键字声明需要调用者处理；调用者需要根据声明处理异常。

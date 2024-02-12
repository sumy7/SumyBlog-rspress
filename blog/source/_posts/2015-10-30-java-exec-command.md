---
layout: post
title: Java调用外部命令
date: '2015-10-30 14:46:45'
categories:
  - 编程语言
tags:
  - java
  - shell
  - cmd
---

# Java调用外部命令

Java调用外部命令的基本方法是：通过`Runtime.getRuntime()`返回一个当前环境的运行时，通过运行时来调用外部的命令。

# 函数原型

调用外部命令可以使用以下命令：

> java.lang
>     Class Runtime
>
> java.lang.Object
>     java.lang.Runtime
>  
> Process exec(String command)
> Process exec(String[] cmdarray)
> Process exec(String[] cmdarray, String[] envp)
> Process exec(String[] cmdarray, String[] envp, File dir)
> Process exec(String command, String[] envp)
> Process exec(String command, String[] envp, File dir)


`command`和`cmdarray`是要执行的命令。其中`cmdarray[0]`是要执行的命令，其它的作为参数。
`envp`是执行命令附带的环境。
`dir`是执行命令所在的目录。
命令执行会返回一个`Process`对象，通过该对象可以与执行命令的子进程进行通信，包括写输入读输出等。

# 示例代码

下面的代码演示了基本的使用方法，执行一个命令，并读取命令的返回。

```java
public class TestRunTime {  
    public static void main(String[] args) {  
    Process p = Runtime.getRuntime().exec("javac");
    InputStream is = p.getInputStream();
    BufferedReader reader = new BufferedReader(new InputStreamReader(is));
    String line;
    while((line = reader.readLine())!= null){
        System.out.println(line);
    }
    p.waitFor();
    is.close();
    reader.close();
    p.destroy();
    }
}
```

# 注意问题

Java执行命令不同于普通的Shell执行命令，一些命令需要自己指定shell执行，带有命令参数的命令最好通过`cmdarray`的方式执行。
例如：

1. 命令`ping 127.0.0.1` 可以写成

```java
Runtime.getRuntime.exec(new String[]{"ping", "127.0.0.1"});
```

2. 重定向命令 `echo 'hello' > 1.txt` 需要写成

```java
Runtime.getRuntime.exec(new String[]{"/bin/sh","-c","echo 'hello' > 1.txt"});
```

## 参考内容

+ [Java运行命令行并获取返回值](http://accptlq.iteye.com/blog/1490890)
+ [JAVA调用系统命令或可执行程序](http://wuhongyu.iteye.com/blog/461477/)

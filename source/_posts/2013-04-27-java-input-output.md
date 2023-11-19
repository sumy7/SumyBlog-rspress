---
layout: post
title: Java输入输出外挂
date: '2013-04-27 00:00:00'
categories:
  - 编程语言
tags:
  - java
  - 姿势
description: 看似好多大牛都写这种，是不是这就是传说中的 Java 输入输出外挂！！！
reference:
  - title: 代码出处 by ftiasch
    url: 'https://github.com/ftiasch/acm-icpc/blob/master/Main.java'
---

今天翻别人写的代码的时候无意中发现了这个，TA 写的 Java 版本的代码中，好多都用了这个。让我稍微看看这究竟是何方神圣。

```java
import java.io.*;
import java.math.*;
import java.util.*;

public class Main {
    InputReader reader;
    PrintWriter writer;

    Main() {
        reader = new InputReader();
        writer = new PrintWriter(System.out);
    }

    public static void main(String[] args) {
        new Main().run();
    }

    public void run() {
        try {
            // main
        } catch (IOException ex) {
        }
        writer.close();
    }
}

class InputReader {
    BufferedReader reader;
    StringTokenizer tokenizer;

    InputReader() {
        reader = new BufferedReader(new InputStreamReader(System.in));
        tokenizer = new StringTokenizer("");
    }

    String next() throws IOException {
        while (!tokenizer.hasMoreTokens()) {
            tokenizer = new StringTokenizer(reader.readLine());
        }
        return tokenizer.nextToken();
    }

    Integer nextInt() throws IOException {
        return Integer.parseInt(next());
    }
}
```

这段代码重写了 Java 的输入流的 nextInt() 方法，通过一个 `StringTokenizer` 类来实现相应的功能。

StringTokenizer 是一个用来分隔 String 的应用类，相当于 VB 的 split 函数。这里还是不过分介绍了。具体介绍还是查看另一篇日志吧[Java类StringTokenizer的说明](../java-stringtokenizer)

这样一来，整个代码的输入过程就很明确了，通过`StringTokenizer`类中的方法来分割字符串，然后将字符串粘贴为对应的数据类型返回。

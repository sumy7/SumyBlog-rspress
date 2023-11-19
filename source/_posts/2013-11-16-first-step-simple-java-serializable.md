---
layout: post
title: 简单了解JAVA对象序列化（Serializable）
date: '2013-11-16 00:00:00'
categories:
  - 编程语言
tags:
  - java
  - 姿势
description: 今天在整理 BAE 相关内容的时候突然发现了一个新东西 serializable ，中文名是序列化。通过了解这个新姿势，我终于找到了一种将对象保存的方法。
reference:
  - title: 序列化_百度百科
    url: >-
      http://baike.baidu.com/link?url=paJY1IlCInRhpfLu8muhX_ScvJ9dVsEycRm_283NGiCwoggFrn0sjZ_v2mFShkQO
  - title: 我对Java Serializable（序列化）的理解和总结 - 锲而不舍 金石可錄
    url: 'http://xiebh.iteye.com/blog/121311'
  - title: JAVA 对象序列化（一）——Serializable - chenfei0801
    url: 'http://www.cnblogs.com/chenfei0801/archive/2013/04/05/3001149.html'
---

# 序列化是什么？

先来一个[百度百科](http://baike.baidu.com/link?url=paJY1IlCInRhpfLu8muhX_ScvJ9dVsEycRm_283NGiCwoggFrn0sjZ_v2mFShkQO)上的解释：

> 序列化 (Serialization)是将对象的状态信息转换为可以存储或传输的形式的过程。在序列化期间，对象将其当前状态写入到临时或持久性存储区。以后，可以通过从存储区中读取或反序列化对象的状态，重新创建该对象。

这里我们通俗一点来说就是将一个对象的状态数据保存起来，然后并可以根据这些数据恢复原来成的对象。当然，你也可以通过各种方法来保存一个对象的内部数据，但是 JAVA 提供了一个更好的保存方式。

# 序列化可以干神马

1. 当你想把的内存中的对象状态保存到一个文件中或者数据库中时候；以某种存储形式使自定义对象持久化。

2. 当你想用套接字在网络上传送对象的时候；将对象从一个地方传递到另一个地方。

3. 使程序更具维护性。

# 使用序列化

在JAVA中有一个接口

> public interface **Serializable**

类通过实现 java.io.Serializable 接口以启用其序列化功能。未实现此接口的类将无法使其任何状态序列化或反序列化。可序列化类的所有子类型本身都是可序列化的。序列化接口没有方法或字段，仅用于标识可序列化的语义。

下面通过一个例子简单了解一下序列化和反序列化：

数据类：

```java
import java.io.Serializable;

public class Data implements Serializable {

    private static final long serialVersionUID = 1L;

    /*
     * 简单的类来测试一下序列化
     */
    private int n;

    public int getN() {
        return n;
    }

    public void setN(int n) {
        this.n = n;
    }

    public Data(int n) {
        this.n = n;
    }

    public String toString() {
        return ("n = " + Integer.toString(n));
    }
}
```

主方法：

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Main {

    public static void main(String[] args) {

        Data dataout = new Data(888);
        System.out.println(dataout);
        Data datain;

        try {
            // 序列化演示：将对象保存到文件中
            FileOutputStream fos = new FileOutputStream("ser.txt");
            ObjectOutputStream os = new ObjectOutputStream(fos);
            os.writeObject(dataout);
            os.close();

            // 反序列化演示，将文件中保存的对象还原
            FileInputStream fis = new FileInputStream("ser.txt");
            ObjectInputStream is = new ObjectInputStream(fis);
            datain = (Data) is.readObject();
            System.out.println(datain.toString());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
```

运行结果：

> n = 888
> n = 888

如果我们想要序列化一个对象，首先要创建某些 OutputStream (如 FileOutputStream 、 ByteArrayOutputStream 等)，然后将这些 OutputStream 封装在一个 ObjectOutputStream 中。这时候，只需要调用 writeObject() 方法就可以将对象序列化，并将其发送给 OutputStream （记住：对象的序列化是基于字节的，不能使用Reader和Writer等基于字符的层次结构）。而反序列的过程（即将一个序列还原成为一个对象），需要将一个 InputStream (如 FileInputstream 、 ByteArrayInputStream 等)封装在 ObjectInputStream 内，然后调用 readObject() 即可。

# 注意问题

1. Serializable 序列化时，只对对象的状态进行保存，而不管对象的方法；
2. 当一个父类实现序列化，子类自动实现序列化，不需要显式实现 Serializable 接口；
3. 当一个对象的实例变量引用其他对象，序列化该对象时也把引用对象进行序列化，即添加 Serializable 接口；
4. 并非所有的对象都可以序列化：安全方面的原因，比如一个对象拥有 private ， public 等 field，还有资源分配方面的原因等等；
5. 最好添加一个域 serialVersionUID （串行化版本统一标识符），来表明保存的对象使用的编码值。

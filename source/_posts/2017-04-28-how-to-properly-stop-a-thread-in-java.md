---
layout: post
title: 如何在Java中正确的终止一个线程
date: '2017-04-28 20:55:14'
categories:
  - 编程语言
tags:
  - java
  - thread
  - 线程
reference:
  - url: >-
      http://stackoverflow.com/questions/10961714/how-to-properly-stop-the-thread-in-java
    title: multithreading - How to properly stop the Thread in Java? - Stack Overflow
  - url: 'http://zguide.zeromq.org/java:mspoller'
    title: Multiple socket poller in Java
  - url: >-
      http://stackoverflow.com/questions/2983835/how-can-i-interrupt-a-serversocket-accept-method
    title: How can I interrupt a ServerSocket accept() method?
---

# 含有死循环的线程是无法知道自己该什么时候结束的

一个工作线程需要不断接受外部的消息，这样的线程内部通常有一个死循环 `while(true){}` 。因为死循环的存在，该线程自己无法知道何时才能停止循环，只能通过外部线程通知该线程的结束。

要结束一个线程，Thread里有一个 `stop()` 方法可以粗暴的杀死一个线程。这样做会出现一些问题，被结束的线程会被立即停止，没有时间处理一些善后工作。在多线程环境下，就可能会出现数据不一致的问题，这是非常危险的。因此，`stop()` 方法被置为_弃用_方法。

那么如何才能更好的结束一个线程？

# 这里有两种方法可以让外部线程结束一个线程

我们需要给线程处理善后工作的机会，一般来说就是给线程一个信号，希望线程能尽快完善工作，然后**跳出**死循环。

## 设置标记变量

在线程工作之余，检查标记变量，如果标记变量被改变，则自行中断退出。

```java
public class Thread1 extends Thread {
    private volatile boolean isStop = false;

    public void stopMe() {
        isStop = true;
    }

    @Override
    public void run() {
        while(!isStop){
            // 处理逻辑
        }
    }
}
```

这里增加一个`volatile`标注的变量isStop来记录是否需要结束线程，`run()`中的死循环也由isStop变量操控。通过调用stopMe()方法改变变量的值，使死循环可以自行退出。

## 捕获线程中断

关于线程中断有Thread中有几个方法：

```java
public void Thread.interrupt() // 中断一个线程
public boolean Thread.isInterrupted() // 判断线程是否中断
public static boolean Thread.interrupted() // 判断是否中断，并清除中断位
```

通过`Thread.interrupt()`方法可以设置一个线程的中断位，线程通过检查中断位来自行进行中断操作。

```java
public class Thread2 extends Thread {

    @Override
    public void run() {
        while(!Thread.currentThread().isInterrupted()) {
            // 处理逻辑
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt(); // 设置中断状态
            }
        }
    }
}
```

需要注意的是一些阻塞方法像`sleep()`等会清除中断标志，所以在catch的时候需要重新设置一下中断标志。

# 太忙的线程无法及时听到撤退的号角

如果线程阻塞在一个事件上，那么给线程发送关闭消息，线程也无法及时的收到，只能等到事件出现，线程退出阻塞状态的时候才能接着进行下一步操作。

对于这种情况，起初也没有好的方法，于是就假想了一下：可以在通知线程关闭的时候，发送一个_假_的事件，让线程强行退出阻塞状态。但是这种使用假事件的方式很容易造成系统“混乱”，不是一个很好的方法。

如果一个线程阻塞在Socket通信上，可以在另一个线程上调用这个Socket的`close()`方法，这样会使其抛出`SocketException`而退出。官方文档没有提到这种方法，可以用来做个参考。

一个比较好的思路就是，改阻塞为非阻塞，这样线程就有足够的机会捕获到关闭消息。比如用NIO包中的Channel来管理Socket。

以ZMQ为例，通过`ZMQ.Poller`轮询避免阻塞的发生。以下代码是官方的示例：

```java
import org.zeromq.ZMQ;

public class MSPoller {

    public static void main (String[] args) {
        ZMQ.Context context = ZMQ.context(1);

        // Connect to task ventilator
        ZMQ.Socket receiver = context.socket(ZMQ.PULL);
        receiver.connect("tcp://localhost:5557");

        //  Connect to weather server
        ZMQ.Socket subscriber = context.socket(ZMQ.SUB);
        subscriber.connect("tcp://localhost:5556");
        subscriber.subscribe("10001 ".getBytes());

        //  Initialize poll set
        ZMQ.Poller items = new ZMQ.Poller (2);
        items.register(receiver, ZMQ.Poller.POLLIN);
        items.register(subscriber, ZMQ.Poller.POLLIN);

        //  Process messages from both sockets
        while (!Thread.currentThread ().isInterrupted ()) {
            byte[] message;
            items.poll();
            if (items.pollin(0)) {
                message = receiver.recv(0);
                System.out.println("Process task");
            }
            if (items.pollin(1)) {
                message = subscriber.recv(0);
                System.out.println("Process weather update");
            }
        }
        receiver.close ();
        context.term ();
    }
}
```

总的来说，尽量通知线程自己去结束自己的任务，由此可以尽量避免一些意外情况的发生。
---
layout: post
title: 百度BAE初次尝试
date: '2013-11-04 00:00:00'
categories:
  - 网站
tags:
  - bae
  - baidu
description: >-
  百度BAE类似于谷歌的网站应用发布，也具有托管网站的功能。今日突发奇想，就想把自己用J2EE写的一个小网站放到上面去，结果遇到各种问题。暂时算是解决了一些吧，将遇到的问题记录下来。
reference:
  - title: BAE使用笔记2-改造JFinal Demo部署到BAE上 - 土龙的个人空间
    url: 'http://my.oschina.net/u/173975/blog/137423'
  - title: docs/cplat/rt/demo - 百度开发者中心
    url: 'http://developer.baidu.com/wiki/index.php?title=docs/cplat/rt/demo'
  - title: 在GAE中使用struts2框架 - 明年我18
    url: 'http://www.cnblogs.com/default/archive/2010/11/05/1870313.html'
  - title: 'Struts 2 on GAE – Error: result ‘null’ not found'
    url: >-
      http://www.mkyong.com/google-app-engine/struts-2-on-gae-error-result-null-not-found/
  - title: (BAE)jetty8+struts2導致 welcome-file-list 失效
    url: 'http://rritw.com/a/JAVAbiancheng/Struts/20130914/424003.html'
  - title: 'JAVA BAE 问题总结 - 记录走下的弯路, 让更多的人快捷到达终点 - 博客频道'
    url: 'http://blog.csdn.net/ostrichmyself/article/details/8098119'
---

# 使用的软件

百度开发者平台（以下简称 BAE 平台）可以支持 PHP 、 Java 和 Python 代码的 Web APP 。BAE 有着自己一套 MySQL 数据库方法和代码托管方式。掌握好这些，对于今后写博客（不仅仅是写博客）找临时空间使用还是有好处的。

对于代码托管方式，BAE 提供了两种方法 SVN 和 Git 。每种都有自己的好处，这里还是推荐使用 SVN 吧，至于为什么，其实我也不知道为什么。只是觉得 Git 类的用过 Github 了。

1. SVN 软件就使用 TortoiseSVN ，可以去官网下载。
2. 编程环境 BAE 官方推荐使用 eclipse ，因为 BAE 有着一套适用于 eclipse 的 bdt 插件，myeclipse 是无法安装的，当然你也可以用 myeclipse 写完，然后用记事本修改提交。当然 BAE 的在线编辑环境也是很赞的。

# 适配的问题

## 环境搭建

BAE 提供了一个用于 eclipse 的插件来支持 BAE 开发，所以在 myeclipse 下暂时没法使用。可以考虑将需要移植到云平台特性的类单独写出来，然后重新书写一下。

BAE 支持标准的 eclipse 开发目录，所以只要把整个目录提交上去就可以了，注意要删除编译生成的 classes 文件夹，还有建议将 IDE 环境下用到的包，全部Copy到工程路径的 lib 目录下，就是根目录。如果对目录有什么疑问，可以下载新建的默认的版本库来查看目录结构。

建议新建两个代码版本，一个用于发布网站，只将修改的可以发布的网站合并到该版本，另一个用于测试用。不然在一个版本里修改很无奈。

## 配置文件

BAE 需要单独的配置文件 `duapp-web.xml` ，这个文件要放到和 web.xml 同目录。

```xml
<?xml version="1.0" encoding="utf-8"?>
<du-web-app xmlns="http://bae.baidu.com/java/1.0">


  <system-properties>
    <property name="author" value="sumy"/>
  </system-properties>

  <sessions-enabled>true</sessions-enabled>

</du-web-app>
```

## 数据库连接

BAE 使用的是 mysql 云数据库，基本的数据库操作都能使用，就是在获取数据库用户名密码的时候不同，还有每次连接只能选择一次数据库。具体情况请参考 [帮助文档](http://developer.baidu.com/wiki/index.php?title=docs/cplat/rt/java/mysql)

下面的代码来自帮助文档，可以参考来改自己的数据库类。

```java
//（1）指定服务地址，其中dbname需要自己修改
//String dbUrl = "jdbc:mysql://sqld.duapp.com:4050/dbname";
//（2）直接从请求header中获取ip、端口、用户名和密码信息
//String host = request.getHeader("BAE_ENV_ADDR_SQL_IP");
//String port = request.getHeader("BAE_ENV_ADDR_SQL_PORT");
//String username = request.getHeader("BAE_ENV_AK");
//String password = request.getHeader("BAE_ENV_SK");
//（3）从线程变量BaeEnv接口获取ip、端口、用户名和密码信息
String host = BaeEnv.getBaeHeader(BaeEnv.BAE_ENV_ADDR_SQL_IP);
String port = BaeEnv.getBaeHeader(BaeEnv.BAE_ENV_ADDR_SQL_PORT);
String username = BaeEnv.getBaeHeader(BaeEnv.BAE_ENV_AK);
String password = BaeEnv.getBaeHeader(BaeEnv.BAE_ENV_SK);
String driverName = "com.mysql.jdbc.Driver";
String dbUrl = "jdbc:mysql://";
String serverName = host + ":" + port + "/";

//从平台查询应用要使用的数据库名
String databaseName = "yourDataBaseName";
String connName = dbUrl + serverName + databaseName;
String sql = "select * from test";

Connection connection = null;
Statement stmt = null;
ResultSet rs = null;
try {
    Class.forName(driverName);
    //具体的数据库操作逻辑
    connection = DriverManager.getConnection(connName, username, password);
    stmt = connection.createStatement();
    rs = stmt.executeQuery(sql);
    String id = "", name = "";
    System.out.println("id&nbsp;&nbsp;&nbsp;&nbsp;name<br/>");
    while (rs.next()) {
        id = rs.getString("id");
        name = rs.getString("name");
        System.out.println(id + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + name + "<br/>");
    }
} catch (ClassNotFoundException ex) {
    // 异常处理逻辑
  throw ex;
} catch (SQLException e) {
    // 异常处理逻辑
    throw e;
} finally {
    try {
        if (connection != null) {
            connection.close();
        }
        } catch (SQLException e) {
            throw e;
    }
}
```

## 静态变量无法常驻内存

由于 BAE 使用的是分布式服务器，每次请求会随机落到一个服务器上，所有静态变量会重新初始化，即使是相同的客户端请求也不例外，所以无法保存，可以保存到 Cache 上或写到数据库里。

Cache 的使用方法可以参考：[帮助文档](http://developer.baidu.com/wiki/index.php?title=docs/cplat/rt/java/cache)

```java
BaeMemcachedClient a = new BaeMemcachedClient();

Object obj = a.get("XXX");
if (obj == null)
{
    //注意, mgrIndtance 需要是可序列化的实例，即其本身以及内部的对象都实现 Serialiable 接口
    boolean value = a.add("XXX", mgrIndtance);
    //返回true，则表示增加进去了，如果非序列化对象则会返回为false
}
```

## Session 无法使用

原因同上，基于 BAE 的分布式特性，Session 也不能被很好支持，也是考虑将其添加到 Cache 中。

我的方法是写一个类以 SessionID 作为键值对在 BaeMemcached 中进行登录信息的操作，并同步设置到 Session 里面。

**注意：** 保存登录信息的对象要实现 Serialiable 接口。

```java
package com.sumy.tools;

import java.util.Map;
import java.util.logging.Logger;
import java.util.logging.Level;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.baidu.bae.api.factory.BaeFactory;
import com.baidu.bae.api.memcache.BaeMemcachedClient;

import com.sumy.type.OnlineUser;


public class SessionOperationAdapter {
    public static OnlineUser sessionGetUser() {
        try{
            BaeMemcachedClient mc = BaeFactory.getBaeMemcachedClient();
            HttpServletRequest request = ServletActionContext.getRequest();
            String sessionId = request.getSession().getId();

            ActionContext actionContext = ActionContext.getContext();
            Map session = actionContext.getSession();

            OnlineUser visitor = null;

            visitor = (OnlineUser)mc.get(sessionId + "visitor");

            session.put("visitor", visitor);
            return visitor;
        }
        catch(Exception ex)
        {
        }
        return null;
    }

    public static void sessionSetUser(OnlineUser visitor) {
        BaeMemcachedClient mc = BaeFactory.getBaeMemcachedClient();
        HttpServletRequest request = ServletActionContext.getRequest();
        String sessionId = request.getSession().getId();

        ActionContext actionContext = ActionContext.getContext();
        Map session = actionContext.getSession();
        session.put("visitor", visitor);

        mc.add(sessionId + "visitor",visitor);
    }

    public static void sessionDelUser(){
        BaeMemcachedClient mc = BaeFactory.getBaeMemcachedClient();
        HttpServletRequest request = ServletActionContext.getRequest();
        String sessionId = request.getSession().getId();

        ActionContext actionContext = ActionContext.getContext();
        Map session = actionContext.getSession();
        session.remove("visitor");

        mc.delete(sessionId + "visitor");
    }
}
```

## 用户日志

在本地我们可以使用 System.out.println() 来打印用户日志，在云环境中要使用手动打印的方法来调试错误，具体可以参考[帮助文档](http://developer.baidu.com/wiki/index.php?title=docs/cplat/rt/java/log)

```java
import java.util.logging.Logger;
import java.util.logging.Level;

Logger logger = Logger. getLogger("name");
logger.log(Level.INFO, " this is for notice log print ");
```

# 遇到的问题

## 问题1：默认分布式 Session 不开放

**注意：** 本方法只是解决了 Session 无法使用的错误提示，而没有真正解决 Session 在分布式系统中无法使用的局面。

如果你的代码中使用了 Session，那么使用 Session 的时候会出现以下提示：

```
java.lang.RuntimeException: Session support is not enabled in duapp-web.xml. To enable sessions, put <sessions-enabled>true</sessions-enabled> in that file. Without it, getSession() is allowed, but manipulation of sessionattributes is not.
```

解决方法就是在配置文件 `duapp-web.xml` 中添加一句 `<sessions-enabled>true</sessions-enabled>` 。

注意不要拼写错误，否则发布无法成功。

## 问题2：HTTP ERROR 404

登录的时候会出现

```
HTTP ERROR 404
Problem accessing /toLogin. Reason:

    result 'null' not found
```

**解决方法：** 弄一个 listener 。添加类 StrutsAppEngineAdapter ，内容如下：

```java
package com.test;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import ognl.OgnlRuntime;

public class StrutsAppEngineAdapter implements ServletContextListener {
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        OgnlRuntime.setSecurityManager(null);
    }

    public void contextDestroyed(ServletContextEvent servletContextEvent) {
    }
}
```

修改 web.xml ，把这个 listener 加进来：

```xml
<listener>
    <listener-class>com.test.StrutsAppEngineAdapter</listener-class>
</listener>
```

## 问题3：访问域名出错（此方法适用于 jetty 服务器，经测试不适合 Tomcat 服务器）

错误信息：

```
There is no Action mapped for namespace [/] and action name [] associated with context path []. - [unknown location]
    com.opensymphony.xwork2.DefaultActionProxy.prepare(DefaultActionProxy.java:185)
    org.apache.struts2.impl.StrutsActionProxy.prepare(StrutsActionProxy.java:63)
    org.apache.struts2.impl.StrutsActionProxyFactory.createActionProxy(StrutsActionProxyFactory.java:39)
    com.opensymphony.xwork2.DefaultActionProxyFactory.createActionProxy(DefaultActionProxyFactory.java:58)
    org.apache.struts2.dispatcher.Dispatcher.serviceAction(Dispatcher.java:553)
    org.apache.struts2.dispatcher.ng.ExecuteOperations.executeAction(ExecuteOperations.java:77)
    org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter.doFilter(StrutsPrepareAndExecuteFilter.java:99)
    org.eclipse.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1372)
    org.eclipse.jetty.servlet.ServletHandler.doHandle(ServletHandler.java:487)
    org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:119)
    org.eclipse.jetty.security.SecurityHandler.handle(SecurityHandler.java:480)
    org.eclipse.jetty.server.session.SessionHandler.doHandle(SessionHandler.java:249)
    com.baidu.jetty.security.quotalimit.LimitQuotaHandler.doHandle(LimitQuotaHandler.java:64)
    org.eclipse.jetty.server.handler.ContextHandler.doHandle(ContextHandler.java:1003)
    org.eclipse.jetty.servlet.ServletHandler.doScope(ServletHandler.java:417)
    org.eclipse.jetty.server.session.SessionHandler.doScope(SessionHandler.java:200)
    com.baidu.jetty.security.quotalimit.LimitQuotaHandler.doScope(LimitQuotaHandler.java:43)
    org.eclipse.jetty.server.handler.ContextHandler.doScope(ContextHandler.java:934)
    org.eclipse.jetty.webapp.WebAppContext.doScope(WebAppContext.java:539)
    org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:117)
    org.eclipse.jetty.server.handler.ContextHandlerCollection.handle(ContextHandlerCollection.java:226)
    org.eclipse.jetty.server.handler.HandlerCollection.handle(HandlerCollection.java:149)
    org.eclipse.jetty.server.handler.HandlerWrapper.handle(HandlerWrapper.java:110)
    org.eclipse.jetty.rewrite.handler.RewriteHandler.handle(RewriteHandler.java:305)
    org.eclipse.jetty.server.handler.HandlerWrapper.handle(HandlerWrapper.java:110)
    org.eclipse.jetty.server.Server.handle(Server.java:368)
    org.eclipse.jetty.server.HttpConnection.handleRequest(HttpConnection.java:605)
    org.eclipse.jetty.server.HttpConnection$RequestHandler.headerComplete(HttpConnection.java:1069)
    org.eclipse.jetty.http.HttpParser.parseNext(HttpParser.java:601)
    org.eclipse.jetty.http.HttpParser.parseAvailable(HttpParser.java:214)
    org.eclipse.jetty.server.HttpConnection.handle(HttpConnection.java:425)
    org.eclipse.jetty.io.nio.SelectChannelEndPoint.handle(SelectChannelEndPoint.java:535)
    org.eclipse.jetty.io.nio.SelectChannelEndPoint$1.run(SelectChannelEndPoint.java:40)
    org.eclipse.jetty.util.thread.QueuedThreadPool$3.run(QueuedThreadPool.java:529)
    java.lang.Thread.run(Thread.java:679)
```

错误的原因就是 Struts2 的拦截器设置了拦截所有的网址，却没有设置默认的 action，这就导致了首页网址找不到匹配的 action 操作。

**解决方案：** 在 struts2 的默认 package 中加入以下配置

```xml
<default-action-ref name="index" />
<action name="index" >
    <result name="success">/index.jsp</result>
</action>
```

## 问题4：对数据库进行中文操作的时候出现 Incorrect string value: "\XXX\XXX\XXX\XXX\XXX" for column 'XXX' at row 1

**解决方法：** 在连接 mysql 数据库的时候添加字符设置字段`?useUnicode=true&characterEncoding=UTF-8`。

## 问题5：乱码导致 BAE 服务端发布失败

BAE 发布不成功，并且查看日志，出现下面的乱码。

```
    2012-10-2210:50:350 [javac] /*??????????*/
```

一种方法是更改 eclipse 的默认编码为 UTF-8 格式。修改方法如下：

{% asset_img 1.png eclipse设置 %}

修改完的时候，文本文件中中文部分将变成乱码，注意修改这些乱码。

另一种方法是用 BAE 的云编辑环境修改乱码，重新保存来解决。

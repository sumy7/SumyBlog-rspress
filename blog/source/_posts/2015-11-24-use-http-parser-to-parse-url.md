---
layout: post
title: 使用http_parser解析URL
date: '2015-11-24 23:18:46'
categories:
  - 编程语言
tags:
  - url
  - 库
  - c/c++
---

# 使用http_parser解析URL

解析URL是个烦心事，尤其是还要使用C语言来解析。写Java写习惯了，好多C的东西都不太会用了。最近的一次作业中需要用到URL的解析，查找了一番就找到了这个开源库。

[http-parser](https://github.com/nodejs/http-parser)由[nodejs](https://github.com/nodejs)项目组开源，具体简介可以去参考主页README。

## http-parser优点

+ 无依赖性
+ 可以处理持久消息(keep-alive)
+ 支持解码chunk编码的消息
+ 支持Upgrade协议升级(如无例外就是WebSocket)
+ 可以防御缓冲区溢出攻击

## 解析函数原型

库的主要功能是解析HTTP头的，而解析URL使用的则是库中的一个函数方法`http_parser_parse_url()`：

```c
int http_parser_parse_url(const char *buf, size_t buflen,  
                          int is_connect,  
                          struct http_parser_url *u);  
```

需要说明的是is_connect参数，当传1时，http_parser_parse_url方法将进行严格检验，如果URL中没有port、schema将导致http_parser_parse_url方法失败，返回非0值。一般给is_connect方法传0即可。

调用函数之后会将解析的port、host、path、schema之类的结果存放到`http_parser_url`的结构体中：

```c
struct http_parser_url {  
  uint16_t field_set;           /* Bitmask of (1 << UF_*) values */  
  uint16_t port;                /* Converted UF_PORT string */  
  
  struct {  
    uint16_t off;               /* Offset into buffer in which field starts */  
    uint16_t len;               /* Length of run in buffer */  
  } field_data[UF_MAX];  
};  
```

结构体未进行任何的内存拷贝，只记录了位置、长度信息等，效率上还是很不错的。目前支持SCHEMA、PORT、HOST、PATH、QUERY、USERINFO、FRAGMENT七种信息的提取。

## 示例代码

被解析的URL至少需要包含UF_SCHEMA和UF_HOST，否则在解析的时候会发生错误。

使用的是博客中的示例代码：

```c
static int parse_url(struct http_client * httpc, const char *url)  
{  
    struct http_parser_url u;  
    if(0 == http_parser_parse_url(url, strlen(url), 0, &u))  
    {  
        if(u.field_set & (1 << UF_PORT))  
        {  
            httpc->port = u.port;  
        }  
        else  
        {  
            httpc->port = 80;  
        }  

        if(httpc->host) free(httpc->host);  
        if(u.field_set & (1 << UF_HOST) )  
        {  
            httpc->host = (char*)malloc(u.field_data[UF_HOST].len + 1);  
            strncpy(httpc->host, url + u.field_data[UF_HOST].off, u.field_data[UF_HOST].len);  
            httpc->host[u.field_data[UF_HOST].len] = 0;  
        }  
  
        if(httpc->path) free(httpc->path);  
        if(u.field_set & (1 << UF_PATH))  
        {  
            httpc->path = (char*)malloc(u.field_data[UF_PATH].len + 1);  
            strncpy(httpc->path, url+u.field_data[UF_PATH].off, u.field_data[UF_PATH].len);  
            httpc->path[u.field_data[UF_PATH].len] = 0;  
        }  

        return 0;  
    }  
  
    return -1;  
}  
```

这里从头文件中摘出了URL参数的定义，可以在代码中获取到相应的部分：

```c
enum http_parser_url_fields
  { UF_SCHEMA           = 0  //模式，协议
  , UF_HOST             = 1  //主机名
  , UF_PORT             = 2  //端口
  , UF_PATH             = 3  //路径
  , UF_QUERY            = 4  //参数   - ?开始的部分
  , UF_FRAGMENT         = 5  //锚标志 - #开始的部分
  , UF_USERINFO         = 6  //用户名 - @之前的部分
  , UF_MAX              = 7
  };
```

## 参考内容

+ [使用http_parser解析URL](http://blog.csdn.net/foruok/article/details/8954726)
+ [http-parser使用简介](http://blog.rootk.com/post/tutorial-for-http-parser.html)

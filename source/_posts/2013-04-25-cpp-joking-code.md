---
layout: post
title: 由一个整人秘籍引发的新知识
date: '2013-04-25 00:00:00'
categories:
  - 编程语言
tags:
  - c/c++
  - 姿势
---

# 由一个整人秘籍引发的新知识

> __LINE__、__FILE__、#line、__func__的用法

今天无意中在人人上看到一个整人的状态：

>程序员幽默： silentbicycle： C语言整人秘笈。 #define true (__LINE__ % 2 == 0) （陈晓鸣在百度 推荐）

于是对其中的 `__LINE__` 表示好奇。通过万能的度娘找到了相应姿势。

C语言中可以使用 `__LINE__` 指示本行语句在源文件中的位置信息：

例

```cpp
#include <stdio.h>
int main()
{
    printf("%d\n",__LINE__);
    printf("%d\n",__LINE__);
    printf("%d\n",__LINE__);
    return 0;
}
```

输出结果：

> 7
> 8
> 9

除了 `__LINE__` 之外还有 `__FILE__` 用于指示本行语句所在源文件的文件名。

例

```cpp
#include <stdio.h>
int main()
{
    printf("%s\n",__FILE__);
    return 0;
}
```

输出结果：

> c:\documents and settings\administrator\桌面\test.c

还可以通过语句 `#line` 来重新设定 `__LINE__` 的值，举例如下：

```cpp
#include <stdio.h>
#line 200  //指定下一行的 __LINE__ 为200
int main()
{
    printf("%d\n",__LINE__);
    printf("%d\n",__LINE__);
    printf("%d\n",__LINE__);
    return 0;
};
```

编译执行后输出结果为：

> 202
> 203
> 204

另外 gcc 还支持 `__func__` ,它指示所在的函数，但是这个关键字不被 windows 下的 vc6.0 支持，举例如下：

```cpp
#include <stdio.h>
void main()
{
    printf("this is print by function %s\n",__func__);
    return 0;
}
```

其编译后输出结果为

> this is print by function main

注意 “`#line`”、 “`__LINE__`”、 “`__FILE__`" 及 “`__func__`" 都是大小写敏感的。

## 参考内容

+ [C语言中的__FILE__、__LINE__和#line](http://blog.csdn.net/taric_ma/article/details/7517949)
+ [C语言中的__FILE__、__LINE__和#line](http://hi.baidu.com/419836321/item/9e0ed112a7d22a061894ecc7)

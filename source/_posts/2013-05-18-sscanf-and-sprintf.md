---
layout: post
title: sscanf与sprintf
date: '2013-05-18 00:00:00'
categories:
  - 编程语言
tags:
  - c/c++
  - 姿势
description: sscanf与sprintf将字符串与其它类型连接起来，在一定程度上方便了字符串的处理。
reference:
  - title: sscanf - C++ Reference
    url: 'http://www.cplusplus.com/reference/cstdio/sscanf/'
  - title: sprintf - C++ Reference
    url: 'http://www.cplusplus.com/reference/cstdio/sprintf/'
---
这两个函数所需要的头文件都包含在`#include<cstdio>`（C++）或者`#include<stdio.h>`（C）。

# sscanf函数

**函数原型：**`int sscanf ( const char * s, const char * format, ...);`

**函数参数：**

> str - - 一个C字符串表示需要得到数据的数据源。
> format - - 一个C字符串表示数据的输入格式，可以参照scanf的形式。Ps：函数支持正则表达式。
> ... *(additional arguments)* - - 依照format的输入格式，函数将str中的相应部分转换成为对应的格式依次存入变量列表中。变量的数目至少要等于格式字符串中变量的数目，多余的变量将被忽略。

**函数返回：**如果函数成功将会返回参数列表中被成功填充的变量的数目；失败的时候返回EOF/-1，遇到错误之前的变量也会被成功填充。

**示例代码：**

```cpp
/* sscanf example */
#include <stdio.h>

int main ()
{
  char sentence []="Rudolph is 12 years old";
  char str [20];
  int i;

  sscanf (sentence,"%s %*s %d",str,&i);
  printf ("%s -> %d\n",str,i);

  return 0;
}
```

Output:

> Rudolph -> 12

# sprintf函数

**函数原型：**`int sprintf ( char * str, const char * format, ... );`

**函数参数：**

> str - - 用于指向一个C字符数组的指针，这个字符数组的大小应足以容纳需要放入变量的总长度。
> format - - 格式字符串，用于指示放入 str 的变量的格式。（可以参照 printf）。
> ...*(additional arguments)* - - 通过format指示的格式形式，将此处的变量“放入”str中，变量的数目至少为格式字符串中标示变量的数量。多出的变量将被忽略。

**函数返回：**如果函数成功，将会返回字符串的长度，长度不包括字符串末尾的结束标志'\0'；失败时返回一个负数。

**示例代码：**

```cpp
/* sprintf example */
#include <stdio.h>

int main ()
{
    char buffer [50];
    int n, a=5, b=3;
    n=sprintf (buffer, "%d plus %d is %d", a, b, a+b);
    printf ("[%s] is a string %d chars long\n",buffer,n);
    return 0;
}
```

Output:

> [5 plus 3 is 8] is a string 13 chars long

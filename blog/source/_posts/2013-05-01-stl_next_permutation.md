---
layout: post
title: STL中next_permutation的应用
date: '2013-05-01 00:00:00'
categories:
  - 编程语言
tags:
  - c/c++
  - 算法
  - stl
description: next_permutation是STL模板中用于求解排列数的一个算法。
reference:
  - title: 使用STL的next_permutation函数生成全排列(C++) - Slyar Home
    url: 'http://www.slyar.com/blog/stl_next_permutation.html'
---

# STL中next_permutation的应用

今天看见了一个很新奇的东东 `next_permutation` ，就拿来试了试。

在 C++ Reference 中查看了一下 next_permutation 的函数声明：

> \#include &lt;algorithm>
> bool next_permutation( iterator start, iterator end );
>
> The next_permutation() function attempts to transform the given range of elements \[start,end) into the next lexicographically greater permutation of elements. If it succeeds, it returns true, otherwise, it returns false.

可以看出 next_permutation 的返回类型为布尔型，意思是是否成功求解出当前排列的下一个排列。

```c
#include <iostream>
#include <algorithm>
#include <string>

using namespace std;

int main()
{
    string str;
    cin >> str;
    sort(str.begin(), str.end());
    cout << str << endl;
    while (next_permutation(str.begin(), str.end()))
    {
        cout << str << endl;
    }
    return 0;
}
```

恩，就这么多了。

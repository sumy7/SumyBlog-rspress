---
layout: post
title: 博客功能插件测试
date: '2013-04-23 00:00:00'
categories:
  - 实验室
tags:
  - 测试
---
# 博客功能插件测试

> 用来测试一下博客的相关插件，主要是高亮插件和代码插件，表格样式还有公式的显示。

## 代码高亮测试

HTML样式代码

<pre class="prettyprint linenums">
#include<iostream>;
using namespace std;

int main()
{
    cout<<"Hello World!"<<endl;
    return 0;
}
</pre>

Markdown样式代码

```cpp
#include<iostream>
using namespace std;

int main()
{
    cout<<"Hello World!"<<endl;
    return 0;
}
```

## 数学公式测试

测试一下数学公式能否正常显示。

$$
e^x = \sum\_{n=0}^\infty \frac{x^n}{n!} = \lim\_{n\rightarrow\infty} (1+x/n)^n
$$

## 表格测试

|head1 head1 head1|head2 head2 head2|head3 head3 head3|head4 head4 head4|
|---|:---|:---:|---:|
|row1text1|row1text3|row1text3|row1text4|
|row2text1|row2text3|row2text3|row2text4|

---
layout: post
title: 欧几里得+扩展的欧几里得算法+线性同余方程+中国剩余定理
date: '2013-05-07 00:00:00'
categories:
  - 算法
tags:
  - 数论
  - 算法
  - acm
description: 欧几里得、扩展的欧几里得算法、线性同余方程、中国剩余定理，这几个都是好重要的算法呀。
reference:
  - title: 欧几里得+扩展的欧几里得算法+线性同余方程+中国剩余定理 - lhfight的专栏
    url: 'http://blog.csdn.net/lhfight/article/details/7755994'
  - title: 辗转相除法 - 维基百科，自由的百科全书
    url: >-
      https://zh.wikipedia.org/wiki/%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E7%AE%97%E6%B3%95
  - title: 线性同余方程 - 维基百科，自由的百科全书
    url: >-
      https://zh.wikipedia.org/wiki/%E7%BA%BF%E6%80%A7%E5%90%8C%E4%BD%99%E6%96%B9%E7%A8%8B
---

# 欧几里得+扩展的欧几里得算法+线性同余方程+中国剩余定理

## 欧几里得算法

欧几里得算法，用于计算两个数的最大公约数。主要有两种实现方法，辗转相除法和辗转相减法。  

代码实现：

```cpp
// 计算最大公约数
private static int getGCD(int a, int b) {//注意a>b
    if (a % b == 0)
        return b;
    else
        return getGCD(a, a % b);
}
```

或者

```cpp
private static int getGCD(int a, int b) {//不要求a>b
    while (b != 0) {
        int k = b;
        b = a % b;
        a = k;
    }
    return a;
}
```

## 扩展欧几里得算法

对于不完全为 0 的非负整数 a 和 b，gcd(a,b)表示 a,b 的最大公约数，必然存在整数对 x,y ，使得 `gcd(a,b)=ax+by`。

扩展欧几里得实质上是在欧几里得算法的基础上找到 `a*x+b*y=gcd(a,b)` 这个式子的一个解。由于gcd(a,b)是a,b的线性组合，这点上面已经说明了（即存在 x,y 使得`gcd(a,b)=ax+by`），所以显然存在这样的线性组合。

考虑这样的一个递归过程。其中 `a%b=a-a/b * b`

1. 当 b=0 时，显然能够找到一组满足的解:x=1,y=0。(注意gcd(a,0)=a)。
2. 当 b!=0 时，设 `d'=b * x'+(a%b) * y'` ，其中b和a%b，就是欧几里得算法下一步递归的两个变量。根据欧几里得知道： `d=gcd(a,b)=d'=gcd(b,a%b)` ，我们将式子里的d=d'改写成x,y来表示，那么就是：`d=b*x'+(a-[a/b]*b)*y'=a*y'+b(x'-[a/b]*y')` (按a,b展开)。我们就能够得到x,y跟x',y'的关系，即 `x=y'` ，`y=x'-[a/b] * y'`。

我们在欧几里德算法中按这样的递推关系进行递归就能解出x,y了。

代码实现：

```cpp
long long x,y,q;
long long exgcd(long long a, long long b)
{
    long long r,t;
    if (b==0)
    {
        x = 1;
        y = 0;
        return a;
    }
    else
    {
        r = exgcd(b, a%b);
        t = x;
        x = y;
        y = t - a/b * y;
    }
    return r;
}
```

## 线性同余方程

线性同余方程是最基本的同余方程，“线性”表示方程的未知次数是一次，基本的形式是

> ax≡b (mod n) 或者
> a\*x+b\*y = n

对于方程 `a*x+b*y=n` 有整数解的条件是（`n%gcd(a,b)==0`）即n能够被 a 和 b 的最大公约数整除（`n=gcd(a,b)*k`）记作`gcd(a,b)|n`，可以理解为扩展欧几里得定理。

所以方程 `a*x+b*y=n` ；我们可以先用扩展欧几里德算法求出一组 x,y 。也就是 `a*x+b*y=gcd(a,b)` ；然后两边同时除以 gcd(a,b) ，再乘以 n 。这样就得到了方程 `a*x*n/gcd(a,b)+b*y* n/gcd(a,b)=n` ；我们也就找到了方程的一个解。

还有一个定理：若 `gcd(a,b)=1` ，且 x0,y0 为 `a*x+b*y=n` 的一组解，则该方程的任一解可表示为：`x=x0+b*t` ， `y=y0-a*t` ；且对任一整数 t，皆成立。

在实际问题中，我们往往被要求去求最小整数解，所以我们就可以将一个特解 x ， `t=b/gcd(a,b)` ， `x=(x%t+t)%t` ；就可以了。

总结一下：

> 对于方程 ax+by=c 即ax=c(mod b)
> 定义：t=gcd(a,b);
> 有解条件
> c%t==0
> 特解x=x * c/t;
> 最小解x=(x%c+c)%c;
> 解系 x=x+k * b/t;y=y-k * a/t;（k为整数）

## 中国剩余定理

对于同余方程组：

x=a1 （mod m1）；
x=a2 （mod m2）；

方程组有一个小于m（m1，m2的最小公倍数）的非负整数解的充分必要条件是`（a1-a2）%（m1，m2）==0` ，同样利用扩展欧几里德算法。

两式联立：`a1+m1*y=a2+m2*z`。

则：`a1-a2=m2*z-m1*y` ; 这样就可以了解出z和y，则：`x=a2+m2*z`；

现在我们将其推广到一般情形：（设m1,m2,···,mk两两互素）

x=a1（mod m1）;
x=a2（mod m2）;
···
x=ak（mod mk）;其在 `M=m1*m2*···*mk` ;中有唯一整数解。

记Mi=M/mi;因为（Mi,mi）=1,故有两整数pi,qi满足`Mi*pi+mi*qi=1`，如果记`ei=Mi*pi`;那么：`ei=0（mod mj）,j!=i; ei=1（mod mj）,j=i;`

很明显，`e1*a1+e2*a2+···+ek*ak` 就是方程的一个解，加减M倍后就可以得到最小非负整数解了。

代码样例（除数两两互质）：

```cpp
#include <iostream>
using  namespace std;
__int64 m[1000];//除数
__int64 r[1000];//余数
__int64  X,Y;

__int64 f2(__int64 a, __int64 b)//扩展欧拉
{
    if (b==0)
    {
        X=1;
        Y=0;
        return a;
    }
    __int64  d=f2(b,a%b);
    __int64 t=X;
    X=Y;
    Y=t-a/b*Y;
    return  d;
}

__int64 f1(long len)//中国剩余定理
{
    __int64 M=1;
    int  i;
    for (i=0;i<len;++i)
    {
        M*=m[i];
    }
    __int64 res=0;
    for(i=0;i<len;++i)
    {
        __int64 Mi=M/m[i];
        f2(Mi,m[i]);
        res=(res+Mi*X*r[i])%M;
    }
    if(res<0)
    {
        res+=M;
    }
    return  res;
}

int main()
{
    int n;
    while(scanf("%d",&n)!=EOF)
    {
        int i;
        for(i=0;i<n;++i)
        {
            scanf("%I64d  %I64d",&m[i],&r[i]);
        }
        printf("%I64d\n",f1(n));
    }
return  0;
}
```

对于m之间不互质的情况，可以想方法将两个同余方程合并：
两个方程合并的一种方法：
x = c1 (mod b1）
x = c2 (mod b2)
此时b1,b2不必互质的。

显然可以得到 `x=k1*b1+c1  x=k2*b2 + c2`，
两个方程合并一下就可以得到：`k1*b1=c2-c1(mod b2)`，
这样可以设`g=gcd(b1,b2)`,于是就有`b1/g*k1-b2/g*k2=(c2-c1)/g`，
显然判断`(c2-c1)/g`是否为整数就能判断是否存在解，
这样在经过类似的变换就能得到`k1=K(mod（b2/g))`，
最后得到`x=K*b1+c1(mod(b1*b2/g))`。

代码实现（除数不一定互质）:

```cpp
int flag=0;
__int64 x,y;
__int64 m[MAXN];
__int64 r[MAXN];
__int64 exgcd(__int64 a, __int64 b)
{
    long long r,t;
    if (b==0)
    {
        x = 1;
        y = 0;
        return a;
    }
    else
    {
        r = exgcd(b, a%b);
        t = x;
        x = y;
        y = t - a/b*y;
    }
    return r;
}
__int64 work(int n)
{
    __int64 m1=m[0];
    __int64 r1=r[0];
    flag=0;
    for (__int64 i = 0; i < n - 1; i++)
    {
        __int64 m2=m[i+1];
        __int64 r2=r[i+1];
        if (flag)
            continue;
        __int64 d = exgcd(m1, m2);
        __int64 c = r2 - r1;
        if (c % d)
        {
            flag = 1;
            continue;
        }
        __int64 t=m2/d;
        x=(c/d*x%t+t)%t;
        r1=m1*x+r1;
        m1=m1*m2/d;
    }
    if (flag)
        return -1;
    else
    {
        if (r1==0&&n>1)
        {
            r1=m[0];
            __int64 ans=1;
            for (int i=1;i<n;i++)
                r1=exgcd(m[i],r1);
            for (int i=0;i<n;i++)
                ans*=m[i];
            r1=ans/r1;
        }
        if (r1==0&&n==1)
            r1=m[0];
        return r1;
    }
}
```

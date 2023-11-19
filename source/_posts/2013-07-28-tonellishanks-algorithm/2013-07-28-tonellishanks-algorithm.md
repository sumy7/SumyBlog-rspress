---
layout: post
title: 模平方根的解法——托内利－尚克斯算法（Tonelli–Shanks algorithm）
date: '2013-07-28 00:00:00'
categories:
  - 算法
tags:
  - 算法
  - 数论
description: 解决一类形如 x^2==n(mod p) 的问题。
reference:
  - title: 模平方根_百度百科
    url: 'http://baike.baidu.com/view/4075762.htm'
  - title: Tonelli–Shanks Algorithm 二次剩余系解法 (Ural 1132. Square Root) - AC_Von
    url: 'http://www.cnblogs.com/vongang/archive/2012/11/01/2749871.html'
  - title: 'Tonelli–Shanks algorithm - Wikipedia, the free encyclopedia'
    url: 'http://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm'
  - title: 二次剩余(quadratic residue) - 冷镜瘦朱颜的日志
    url: 'http://blog.163.com/yuhc123@126/blog/static/3982949720082810566615/'
---

# 定义

给定奇素数p和正整数x（1<=x<=p-1）, 如果存在一个整数y，1<=y<=p-1, 使得x ≡ y * y (mod p) ，则称y是x的模p平方根。
**举例说明：** 63是55的模103平方根，因为有：63 * 63 ≡ 3969 ≡ 55 (mod 103)。

# 算法

托内利－尚克斯算法（Tonelli–Shanks algorithm）可以解决这一类问题。算法流程如下：

**输入：** 奇素数p和正整数x（1<=x<=p-1）

**输出：**

> 设 $p-1 = Q2^S$ ， Q 为奇数。如果 S = 1 ,那么结果就为 $R = ±n^{(p+1)/4}$ ;
> 随机选取 z 使得 `z对p的勒让德符号`等于-1，那么设 $c = z^Q$ ;
> 设 $R = n^{(Q+1)/2}$ ， $t = n^Q$ ， $M=S$ ;
> Loop
> > 如果 t = 1 ，返回结果 R ;
> > 否则 找一个i , 0＜i＜M ，使得 $t^{2^i} = t^{1<<i} = 1$ ;
> > 让 $b = c^{2 * M-i-1}$ , $R = Rb$ , $t = tb^2$ , $c = b^2$ , $M = i$ ;
> End Loop

托内利－尚克斯算法是概率算法，返回正确解的概率为1/2。算法的渐进时间复杂度为O((log p)^4)。

# 代码

给出一个代码加深一下理解。[ural1132](http://acm.timus.ru/problem.aspx?space=1&num=1132)

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;

long long MOD;

long long mod_exp(long long a,long long b) //二分快速幂
{
    long long res=1;
    while(b>0)
    {
        if(b&1) res=(res*a)%MOD;
        a=(a*a)%MOD;
        b>>=1;
    }
    return res;
}

long long solve(long long n,long long p)
{
    int Q=p-1,S=0;
    while(Q%2==0)
    {
        Q>>=1;
        S++;
    }
    if(S==1)
    {
        return mod_exp(n,(p+1)/4);
    }
    int z;
    while(1)
    {
        z=1+rand()%(p-1);
        if(mod_exp(z,(p-1)/2)!=1) break;
    }
    long long c=mod_exp(z,Q);
    long long R=mod_exp(n,(Q+1)/2);
    long long t=mod_exp(n,Q);
    long long M=S,b,i;
    while(1)
    {
        if(t%p==1) break;
        for(i=1;i<M;i++)
        {
            if(mod_exp(t,1<<i)==1) break;
        }
        b=mod_exp(c,1<<(M-i-1));
        R=(R*b)%p;
        t=(t*b*b)%p;
        c=(b*b)%p;
        M=i;
    }
    return (R%p+p)%p;
}

int main()
{
    int T,a,n,i;
    cin>>T;
    while(T--)
    {
        cin>>a>>n;
        if(n==2)
        {
            if(a%n==1) cout<<1<<endl;
            else cout<<"No root"<<endl;
            continue;
        }
        MOD=n;
        if(mod_exp(a,(n-1)/2)!=1)
        {
            cout<<"No root"<<endl;
            continue;
        }
        i=solve(a,n);
        if(i==n-i) cout<<i<<endl;
        else cout<<min(i,n-i)<<" "<<max(i,n-i)<<endl;
    }
    return 0;
}
```

# 勒让德符号

**勒让德符号** 是一个形如这样的分段函数：

{% asset_img 1.gif %}

若 a 是 p 的二次剩余，则返回 1 ; a 是模 p 的二次非剩余，返回 -1 ; a 是 p 的公约数，返回 0 。

对于二次剩余，有一个欧拉判别法：

**欧拉（Euler）判别法：**
若 a 是模 p 的平方剩余， 则 $a^{(p-1)/2} = 1 \pmod{p}$
若 a 是模 p 的平方非剩余， 则 $a^{(p-1)/2} = -1 \pmod{p}$

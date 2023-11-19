---
layout: post
title: n! 与组合数的素因子分解
date: '2013-10-13 00:00:00'
categories:
  - 算法
tags:
  - 数论
  - 算法
description: 阶乘和组合数的素因子分解不同于一般的素因子分解，不同之处就在于枚举的不是每个数的所有素因子，而是每个素因子包含哪些数。
reference:
  - title: FZU_1753 Another Easy Problem - Chris_Home
    url: 'http://blog.csdn.net/ivan_zjj/article/details/7589163'
  - title: 阶乘因式分解 （n的阶乘分解质因数中含m的个数） - 我们一直在努力
    url: 'http://www.cnblogs.com/zhaoguanqin/archive/2011/07/30/2122026.html'
---

# n!的素因子分解

> 首先筛选出所有 [1,n] 的素数，然后对于一个素数 prime[i]，[1,n] 中有因子 prime[i] 的一定是形如：prime[i], 2 * prime[i] ,3 * prime[i] ,...第一轮我们得到的是 n/prime[i] 个因子，并且将 n 变成 n/prime[i]，这样一直到 n 等于 0 的时候就可以求出所有 n! 的 prime[i]的因子了。

这里应用了递归思想：

假设我们以 9! 求解 2 这个素因子的个数为例：

含有2这个素因子的数字有：

```
n - 因子个数
2 - 1
4 - 2
6 - 1
8 - 3
```

计算过程：

```
9/2=4 含2^1的数的个数
4/2=2 含2^2的数的个数
2/2=1 含2^3的数的个数
```

核心思想是看 [2,n] 中含 m^t 次方的个数，含 m,m^2....., 有多少个加几。和就为最后的结果。

贴个代码，不是我写的。。。

```cpp
#include<iostream>
using namespace std;
int main()
{
    int k,i,j,n,m,w,a;
    cin>>k;
    while(k--)
    {
        w=a=0;
        cin>>n>>m;
        w=0;
        do
        {
            n/=m;
            w+=n;
        }while(n);

        cout<<w<<endl;
    }
    return 0;
}
```

# 组合数的素因子分解

根据组合数公式 $C( n , m ) = n! / ( n- m )! * m!$

可以将三个阶乘的素因子组合起来，个数进行加减运算（乘加除减）。具体的实现还是参照下面的题目吧。（太懒了，不想写了。。。）

# 题目

下面以[FZU1753](http://acm.fzu.edu.cn/problem.php?pid=1753)为例：

这个题目是求解多个组合数公共素因子的个数，根据上面组合数分解的算法，就可以很容易写出来了。至于题目为什么要进行素因子分解，因为组合数太大了。

还有题目需要进行一些优化。我们要求解 **公共** 因子的个数，所以只求出最小的那个组合数之间的公因子个数就行了，大于它的素数因子个数的求解就没有意义了。

```cpp
#include <iostream>
#include <cmath>
#include <algorithm>
#include <cstring>
#include <cstdio>

using namespace std;

#define N 100000
bool flag[N+5]={0};
int prime[N],cnt=0;
void Prime(){  //筛素数
    for(int i=2;i<sqrt(N+1.0);i++){
        if(flag[i])
            continue;
        for(int j=2;j*i<=N;j++)
            flag[i*j]=true;
    }
    for(int i=2;i<=N;i++)
        if(!flag[i])
            prime[cnt++]=i;
}

int ans[N];
int tt[N];
int n;
int A[N],B[N];
void solve(int a,int b,int ab,int bound) //求a!/(b!*ab!)的素因子
{
    int tmp;
    for(int i=0;prime[i]<=bound;i++)
    {
        int c=0;
        if(prime[i]<=a)
        {
            tmp=a;
            while(tmp)
            {
                c+=tmp/prime[i];
                tmp/=prime[i];
            }
        }
        if(prime[i]<=b)
        {
            tmp=b;
            while(tmp)
            {
                c-=tmp/prime[i];
                tmp/=prime[i];
            }
        }
        if(prime[i]<=ab)
        {
            tmp=ab;
            while(tmp)
            {
                c-=tmp/prime[i];
                tmp/=prime[i];
            }
        }
        tt[i]=c;
    }
}
int main()
{
    Prime();
    while(scanf("%d",&n)!=EOF)
    {
        memset(ans,0x3f,sizeof(ans));
        int minnum=1000000;
        for(int i=0;i<n;i++)
        {
            scanf("%d %d",&A[i],&B[i]);
            minnum=min(A[i],minnum);
        }
        for(int i=0;i<n;i++)
        {
            memset(tt,0,sizeof(tt));
            solve(A[i],B[i],A[i]-B[i],minnum);
            for(int i=0;prime[i]<=minnum;i++)
            {
                ans[i]=min(ans[i],tt[i]);
            }
        }
        long long result=1;
        for(int i=0;prime[i]<=minnum;i++)
        {
            result*=(long long)(pow(1.0*prime[i],ans[i]));
        }
        printf("%I64d\n",result);
    }
    return 0;
}
```

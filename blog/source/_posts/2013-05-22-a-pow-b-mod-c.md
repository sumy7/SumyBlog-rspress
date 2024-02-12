---
layout: post
title: A^B mod C（指数循环节）的应用
date: '2013-05-22 00:00:00'
categories:
  - 算法
tags:
  - 数论
---

# A^B mod C（指数循环节）的应用
> 一个公式里面藏有好多的秘密。

指数循环节，用于简化大数次幂的运算。简单来说就是一个公式：

$${A}^{x}\ {mod}\ {c}={A}^{(x\ {mod}\ phi(c)+phi(c))}\ mod\ c$$

**注意：** 应用条件是 $x>=phi(c)$

对于指数循环节的一些证明，可以参考AC大牛的证明，这里只是提一下指数循环节的应用问题。

## A^B mod C 的形式

这个首先取C的欧拉函数，对于满足 $A>=phi(C)$ 直接套用公式就可以简化次幂的运算。再加个快速幂就可以更快了。。。

如果不满足公式应用的条件，也不要灰心，因为直接求解就可以了。

## A^a1^a2^... mod C 的形式

这个是最纠结的一种形式，基本思路就是递归分解每一个子指数的形式。

这里需要递归调用的形式是f(ai,phi(m))，起始调用为f(a0,C)；

先贴个代码加深一下理解。【例[hdu2837](http://acm.hdu.edu.cn/showproblem.php?pid=2837)】

```cpp
#define ll long long
long long check(long long a,long long b,long long p) //用于检查a^b是否大于p
{
    long long res=1;
    for(int i=1;i<=b;i++)
    {
        res*=a;
        if(res>=p) return res;
    }
    return res;
}

ll dfs(int n,int m)
{
    ll phi=get_phi(m);
    if(n<10)
    return n;
    ll x=dfs(n/10,phi);
    ll yy=check(n%10,x,m);
    if(yy>=m)
    {
        ll res=quickpow(n%10,x+phi,m);
        if(res==0) //保证返回的指数范围是1..m
        res+=m;
        return res;
    }
    else
    return yy;
}
```

这里有几个地方不好理解：

1. 每次递归下去的时候，要取余的是phi(m)，而非m。这与公式有关，想一下最初的时候总的取余为C，但是指数的时候，如果存在循环节，我们套用公式之后指数的取余就变成phi(C)了，就这样一层一层递归下去。
2. 要保证应用指数循环节之后，返回指数的范围是1..m。这里可以假想一下，如果为0，那么上层的结果就是1了，这样能保证再上层的结果正确吗？反正我是不能保证。
3. 判断使用条件。指数循环节需要判断使用条件，这一点是非常重要的。所以才有了要检查a^b>=c这一个函数。

如果你能很好的理解这种方式了，就可以想象一个更简单的方式。

```cpp
ll exp_mod(ll n,ll m,ll mod)
{
    if(!m)return 1;
    if(!n)return 0;
    ll t=1,ans=1;
    for(int i=0;i<m&&t<mod;++i,t*=n);
    n%=mod;
    while(m)
    {
        if(m&1)ans=ans*n%mod;
        n=n*n%mod;
        m>>=1;
    }
    if(t>=mod)ans+=mod;
    return ans;
}

ll dfs(ll n,ll m)
{
    if(!n)return 1;
    return exp_mod(n%10,dfs(n/10,phi(m)),m);
}
```

这种方法只是将判断使用条件与计算结合起来，简化了递归计算的函数。

当然，对于这种类型的问题，还可以使用非递归的方式进行求解。基本思路是首先将每次需要 mod 的数提前计算放到一个数组中，然后根据递归的深度来判断需要使用的 mod 数。其实好多大牛都是写的非递归的形式，可以参考参考。。。

## 参考内容

+ [【关于 A^x = A^(x % Phi(C) + Phi(C)) (mod C) 的若干证明】【指数循环节】_AekdyCoin的空间](http://hi.baidu.com/aekdycoin/item/e493adc9a7c0870bad092fd9)
+ [雍哥为啥不告诉我博客呀。。。](http://orz)

---
layout: post
title: 欧拉（euler）定理与欧拉函数
date: '2013-05-15 00:00:00'
categories:
  - 姿势
tags:
  - 数论
  - 欧拉
---

# 欧拉（euler）定理与欧拉函数

> 欧拉函数还是次要的，重要的是隐藏在它背后那些不可告人的秘密。

## 欧拉函数

欧拉函数是数论中很重要的一个函数。欧拉函数是指：对于一个正整数 n ，小于 n 且和 n 互质的正整数（包括 1）的个数，记作 φ(n) 。

## 欧拉定理

对于互质的正整数 a 和 n ，有 $a^{\phi(n)} \equiv 1 \bmod n$ 。

### 费马定理

若正整数 a 与素数 p 互质，则有 $a^{p-1} \equiv 1 \bmod{p}$ 。

## 欧拉函数公式

### $p^k$的欧拉函数

对于给定的一个素数 p ，φ(p)=p-1。则对于正整数 $n=p^k$ ， $\phi(p)=p^k-p^{k-1}$

**证明：**

小于 $p^k$ 的正整数个数为 $p^{k - 1}$ 个，其中和 $p^k$ 不互质的正整数有 ${p * 1,p * 2,...,p * (p^{k - 1}-1)}$ 共计 $p^{k - 1} - 1$ 个。所以 $\phi(n) = p^k - 1 - (p^{k - 1} - 1) = p^k - p^{k - 1}$ 。

### p * q的欧拉函数

假设 p, q 是两个互质的正整数，则 p * q 的欧拉函数为

__$φ(p * q) = φ(p) * φ(q)$ ， $gcd(p, q) = 1$__ 。

**证明：**

设 n=p * q ；

则与n互质的数的集合为 $Zn = {1, 2, 3, ... , n - 1} - {p, 2p, ... , (q - 1) * p} - {q, 2q, ... , (p - 1) * q}$

则 $φ(p * q) = φ(n) = (n - 1) - (q - 1) - (p - 1) = (p - 1) * (q -1) = φ(p) * φ(q)$ 。

### 任意正整数的欧拉函数

任意一个整数 n 都可以表示为其素因子的乘积为：

$$n=\prod_{i=1}^Ip_i^{k_i}$$
(I 为 n 的素因子的个数)

根据前面两个结论，很容易得出它的欧拉函数为：

$$\phi(n)=\prod_{i=1}^Ip_i^{k_i-1} (p_i-1)=n\prod_{i=1}^I(1-1/p_i)$$

对于任意 n > 2 ， $2 | Φ(n)$ ，因为必存在  $p_i -1$ 是偶数。

## 欧拉phi函数代码

直接求解

```cpp
long long phi(long long n)
{
    long long i,m=n;
    for(i=2;i*i<=n;i++)
    {
        if(n%i==0)
        {
            m=m-m/i;
            while(n%i==0)  n/=i;
        }
    }
    if(n>1)
        m=m-m/n;
    return m;
}
```

打表

```cpp
const int N(1000000);
int a[N+10];
void euler()
{
    for(int i=2;i<=N;i++)
    {
        if(!a[i])
            for(int j=i;j<=N;j+=i)
            {
                if(!a[j])
                    a[j]=j;
                a[j]=a[j]/i*(i-1);
            }
    }
}
```

欧拉+素数

```cpp
#define MAX 1000001
int phi[MAX];            //保存欧拉函数值
int primes[MAX];         //保存素数值
__int64 summ[MAX]={0};   //保存前欧拉函数值的和
void Eorue()
{
    int primeCount=0;
    phi[1]=1;
    int i,j ;
    for(i=2;i<MAX;i++)
    {
        if(!phi[i])
        {
            for(j=i;j<MAX;j+=i)
            {
                if(!phi[j])
                phi[j]=j;
                phi[j]=phi[j]/i*(i-1);// i 为素数 ;
            }
            primes[primeCount++] = i;//素数表打印
        }
    }
    for(i=2;i<MAX;i++)
    summ[i]+=summ[i-1]+phi[i];
}
```

再来一发

```cpp
#define N 1000000
__int64 prime[N];//存素数
bool f[N];
__int64 Ou[N+2];//存欧拉函数
void fun()
{
    // //打素数表和欧拉函数表，前N个
    __int64 i,j,pNum=0;
    memset(f,false,sizeof(f));
    Ou[1]=1;
    for(i=2;i<=N;i++)
    {
        if(!f[i])
        {
            prime[pNum++]=i;
            Ou[i]=i-1;
        }
    for(j=0;j<pNum && prime[j]*i<=N;j++)
    {
        f[prime[j]*i]=true;
        if(i%prime[j]==0)
        {
            Ou[i*prime[j]]=Ou[i]*prime[j];
            break;
        }
        else
            Ou[i*prime[j]]=Ou[i]*(prime[j]-1);
    }
}
```

已经求解出素数表

```cpp
#define PP 100010
long long prime[PP] ;
int cntp ;
bool is_p[PP] ;

void calc(){
    for(int i=1;i<PP;i++)   is_p[i] = 1 ;
    cntp = 0 ;
    for(long long i=2;i<PP;i++){
        if( is_p[i] ){
            prime[ cntp ++ ] = i ;
            for(long long j=2 ; i*j<PP ;j ++ ){
                is_p[ i*j ] = 0 ;
            }
        }
    }
}

long long get_phi( long long c ){
    long long res = c ;
    for(int i=0;i<cntp && prime[i] * prime[i] <= c ; i++ ){
        if( c % prime[i] == 0 ){
            res = res / prime[i] *( prime[i] - 1 ) ;
            while( c%prime[i] == 0 )    c /= prime[i] ;
        }
    }
    if( c>1 )   res = res / c * (c - 1) ;
    return res ;
}
```

## 参考内容

+ [数论的欧拉定理证明 &amp; 欧拉函数公式 - 蓬篙人的专栏](http://blog.csdn.net/hillgong/article/details/4214327)
+ [欧拉函数公式 - Ray's Blog](http://blog.csdn.net/ray58750034/article/details/640074)
+ [欧拉函数_百度百科](http://baike.baidu.cn/view/107769.htm)
+ [欧拉函数 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E6%AC%A7%E6%8B%89%E5%87%BD%E6%95%B0)
+ [欧拉 phi 函数代码 - Rappy的专栏-火魂の闇狱](http://blog.csdn.net/Rappy/article/details/1747489)
+ [筛法求素数+分解质因子+欧拉函数+求约数 - touzani的专栏](http://blog.csdn.net/touzani/article/details/1759833)
+ [欧拉函数打表（备忘） - Lazy](http://blog.csdn.net/szhhck/article/details/7905020)
+ [打表快速求欧拉函数_poj2478_ZS_918](http://blog.sina.com.cn/s/blog_6b2e32770100wn3p.html)
+ [FZU_1759 Super A^B mod C - Chris_Home](http://blog.csdn.net/ivan_zjj/article/details/7917515)

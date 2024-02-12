---
layout: post
title: 二分矩阵快速幂及其应用
date: '2013-05-10 00:00:00'
categories:
  - 算法
tags:
  - 数论
  - 矩阵
---

# 二分矩阵快速幂及其应用

> 有些东西很慢，然后就变得很快了。二分矩阵快速幂是解决矩阵幂乘的一种方法，主要思想是采用分治方法。

先来一个简单的数的幂运算。

```cpp
long long quickpow(long long m , long long n , long long k) {
    long long ans = 1;
    while(n) {
        if(n&1) //如果n是奇数
            ans = (ans * m) % k;
        n = n >> 1;//位运算“右移1类似除1”
        m = (m * m) % k;
    }
    return ans;
}
```

对于矩阵的幂运算，先给出一个模板。

**更新内容：在矩阵加法和矩阵乘法中，原先的取余方式`if(a.m[i][j]>=MOD)a.m[i][j]%=MOD;`存在负数BUG。还是使用朴素的取余方式吧。**

```cpp
struct matrix
{
    #define M 105
    #define MOD 100000
    ll m[M][M],r,c;
    void init(ll r1,ll c1)
    {
        r=r1,c=c1;
        for(int i=0;i<r1;i++)for(int j=0;j<c1;j++)m[i][j]=0;
    }
    void prt()
    {
        for(int i=0;i<r;i++)
        {
            for(int j=0;j<c;j++)printf("%I64d ",m[i][j]);
            puts("");
        }
        puts("");
    }
};
//矩阵加法
matrix Plus(matrix a,matrix b)
{
    for(int i=0;i<a.r;i++)
        for(int j=0;j<a.c;j++)
        {
            a.m[i][j]+=+b.m[i][j];
            /*//IF MOD
            //if(a.m[i][j]>=MOD)a.m[i][j]%=MOD;
            a.m[i][j]=(a.m[i][j]%MOD+MOD)%MOD;*/
        }
    return a;
}
//矩阵乘法 条件:a.c=b.r 结果:c.r=a.r c.c=b.c
matrix mult(matrix a,matrix b)
{
    matrix ans;ans.init(a.r,b.c);
    for(int i=0;i<a.r;i++)
        for(int k=0;k<a.c;k++)if(a.m[i][k])
            for(int j=0;j<b.c;j++)
            {
                ans.m[i][j]+=a.m[i][k]*b.m[k][j];
                /*//IF MOD
                //if(ans.m[i][j]>=MOD)ans.m[i][j]%=MOD;
                ans.m[i][j]=(ans.m[i][j]%MOD+MOD)%MOD;*/
            }
    return ans;
}
//快速幂
matrix pow(matrix a,ll n)
{
    matrix b,t=a;b.init(a.r,a.c);
    //构造单位矩阵
    for(int i=0;i<b.c;i++)b.m[i][i]=1;
    while(n>=1)
    {
        if(n&1)b=mult(b,t);
        n>>=1;
        t=mult(t,t);
    }
    return b;
}
```

（经测试，运算符重载的效率比上边的效率低）

```cpp
#define MOD 10001
struct Mat {
    int n,m;
    int mat[5][5];
    Mat() {
        memset(mat,0,sizeof(mat));
        n = m = 5;  //矩阵的大小
    };
};
Mat operator *(Mat a,Mat b) {
    Mat c;
    c = Mat();
    c.n = a.n,c.m = b.m;
    for(int i=1;i<=a.n;i++) {
        for(int k=1;k<=a.m;k++) {
            if(a.mat[i][k]!=0){  //这里优化一下，对于稀疏矩阵可以节省一半左右的时间
                for(int j=1;j<=b.m;j++) {
                    c.mat[i][j] += (a.mat[i][k]*b.mat[k][j])%MOD;
                    c.mat[i][j] %= MOD;
                }
            }
        }
    }
    return c;
}
Mat operator +(Mat a,Mat b) {
    Mat c;
    c = Mat();
    c.n = a.n,c.m = a.m;
    for(int i=1;i<=a.n;i++) {
        for(int j=1;j<=a.m;j++) {
            c.mat[i][j] = a.mat[i][j]+b.mat[i][j];
            c.mat[i][j] %= MOD;
        }
    }
    return c;
}
Mat operator ^(Mat a,long long k) {
    Mat c;
    int i,j;
    c = Mat();
    c.n = a.n,c.m = a.n;
    for(i=1;i<=a.n;i++)c.mat[i][i] = 1;
    while(k) {
        if(k&1) {
            c = c*a;
        }
        a = a*a;
        k>>=1;
    }
    return c;
}
void out(Mat a) {
    int i,j;
    for(i=1;i<=a.n;i++) {
        for(j=1;j<=a.m;j++) {
            cout<<a.mat[i][j]<<" ";
        }
        cout<<endl;
    }
}
```

## 参考内容

+ [Matrix67: My Blog » Blog Archive » 十个利用矩阵乘法解决的经典题目](http://www.matrix67.com/blog/archives/276)
+ [矩阵题目 zz - 为生存而奔跑](http://www.cppblog.com/baby-fly/archive/2009/08/18/93686.html)

---
layout: post
title: 8-2-SDAU练习赛（泰山挑夫1）点题报告
date: '2013-08-02 00:00:00'
categories:
  - 读书笔记
tags:
  - 解题报告
  - codeforces
description: 老师说要向泰山挑夫那样一步一步。
---

今天的练习赛似乎又回到了上个暑假的时候，只是感觉少了点什么。

题目大都很基础，只挑几个没有解决的问题说一下吧。

> 6E	 Exposition
> 6D	 Lizards and Basements 2
> 6C	 Alice, Bob and Chocolate
> 6B	 President's Office
> 6A	 Triangle brute
> 4D	 Mysterious Present
> 4C	 Registration System
> 4B	 Before an Exam
> 4A	 Watermelon math

# Codeforece 4D Mysterious Present

**题目大意：** 给出一些信封的长和宽，还有一个礼物。现在要把礼物装到信封中。可以将信封嵌套装到信封中。要求嵌套的层数最多。求解最多的层数。一件物品（礼物和信封）要被装到信封里，长和宽必须严格小于外面的信封。

**大体思路：** 先将信封按照长排序，长相等的可以按照宽排序。然后就可以类似于【最长上升子序列】一样进行dp求解。

**遇到的问题：** 首先是只从能开始装到礼物那个信封开始dp的，而且只把那个信封的层数设为了1，这就导致起点的位置不正确。保存解的时候，也只是考虑了一个，最后把所有的数组都设为了 -1 。

```cpp
#include <iostream>
#include <cstdio>
#include <cmath>
#include <cstring>
#include <algorithm>
#define ll long long
using namespace std;
struct node
{
    int id;
    ll x,y;
}p[5005];
int head[5005];
int f[5005];
int ans[5005];
int n;
ll w,h;
int beg;
int cmp(node a,node b)
{
    if(a.x==b.x) return a.y<b.y;
    else return a.x<b.x;
}
void printfs(int now)
{
    if(now==-1) return ;
    printfs(head[now]);
    cout<<p[now].id<<" ";
}
void getans(int beginx)
{
    int tmp=beginx;
    int nn=0;
    while(tmp!=-1)
    {
        ans[nn++]=tmp;
        tmp=head[tmp];
    }
    cout<<p[ans[nn-1]].id;
    for(int i=nn-2;i>=0;i--)
    {
        cout<<" "<<p[ans[i]].id;
    }
    cout<<endl;
}
int main()
{
    cin>>n>>w>>h;
    for(int i=0;i<n;i++)
    {
        cin>>p[i].x>>p[i].y;
        p[i].id=i+1;
    }
    sort(p,p+n,cmp);
//    for(int i=0;i<n;i++)
//    {
//        cout<<p[i].x<<" "<<p[i].y<<endl;
//    }
    beg=-1;
    for(int i=0;i<n;i++)
    {
        if(p[i].x>w&&p[i].y>h)
        {
            beg=i;
            break;
        }
    }
    //cout<<"--"<<beg<<endl;
    if(beg==-1)
    {
        cout<<"0"<<endl;
    }
    else
    {
        memset(f,0,sizeof(f));
        memset(head,-1,sizeof(head));
        head[beg]=-1;
        //f[beg]=1;
        for(int i=0;i<n;i++)
        {
            if(p[i].x>w&&p[i].y>h)
            {
                f[i]=1;
            }
        }
        for(int i=0;i<n;i++)
        {
            if(!(p[i].x>w&&p[i].y>h)) continue;
            for(int j=0;j<i;j++)
            {
                if(!(p[j].x>w&&p[j].y>h)) continue;
                if((p[i].x>p[j].x)&&(p[i].y>p[j].y)&&(f[i]<f[j]+1))
                {
                    head[i]=j;
                    f[i]=f[j]+1;
                }
            }
        }
        int max=-1;
        int tmp;
        for(int i=beg;i<n;i++)
        {
            if(f[i]>max)
            {
                max=f[i];
                tmp=i;
            }
        }
        cout<<f[tmp]<<endl;
        //printfs(tmp);
        getans(tmp);
//        cout<<endl;
    }
    return 0;
}
```

# Codeforces 6E Exposition

**题意：** 给出一些书，这些书已经固定了次序。从中选出一个区间，保证这个区间最长，而且不超过设定的值 k 。只输出最长区间的书的范围。

**大体思路：** 考虑到记录每个区间最大值和最小值的问题，我想到了用单调队列，两个单调队列分别用来保存最大值和最小值。然后如果最大值和最小值超过了 k ，就两个队列中编号最小的那个值，并根据区间的长度保存区间的范围（用了无数个 vector ）。最后输出最长区间的区间范围即可。

**遇到的问题：** 感觉就是题意没理解好，最后看着数据才慢慢理解了题意。这道题算是根据数据水过的吧。。。

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;
struct node
{
    int id;
    int h;
}p[100005];
int n,k;
deque<node>Qinc;
deque<node>Qdec;
vector<int>ans[100005];
int maxlen;
int main()
{
    cin>>n>>k;
    for(int i=0;i<n;i++)
    {
        cin>>p[i].h;
        p[i].id=i+1;
    }
    maxlen=0;
    Qinc.clear();
    Qdec.clear();
    for(int i=0;i<100000;i++) ans[i].clear();
    Qinc.push_back(p[0]);
    Qdec.push_back(p[0]);
    int begins,ends;
    begins=1;ends=1;
    for(int i=1;i<n;i++)
    {
        //cout<<Qinc.size()<<endl;
        //cout<<Qdec.size()<<endl;
        while((!Qinc.empty())&&(p[i].h<Qinc.back().h)) Qinc.pop_back();
        while((!Qdec.empty())&&(p[i].h>Qdec.back().h)) Qdec.pop_back();
        Qinc.push_back(p[i]);
        Qdec.push_back(p[i]);
        if(Qdec.front().h-Qinc.front().h>k)
        {
            ends=i;
            //cout<<begins<<" "<<ends<<endl;
            if(ends-begins>0)
            {
                ans[ends-begins].push_back(begins);
                ans[ends-begins].push_back(ends);
                if(ends-begins>maxlen) maxlen=ends-begins;
            }
//            if(ends-begins==0&&p[begins-1].h<=k)
//            {
//                ans.push_back(begins);
//                ans.push_back(ends);
//                if(ends-begins>maxlen) maxlen=ends-begins;
//            }
            while(Qdec.front().h-Qinc.front().h>k)
            {
                if(Qinc.front().id<Qdec.front().id)
                {
                    begins=Qinc.front().id+1;
                    Qinc.pop_front();
                }
                else if(Qinc.front().id>Qdec.front().id)
                {
                    begins=Qdec.front().id+1;
                    Qdec.pop_front();
                }
            }
        }
    }
    if(Qdec.front().h-Qinc.front().h<=k)
    {
        //cout<<begins<<" "<<n<<endl;
        if(n-begins>0)
        {
            ans[n-begins].push_back(begins);
            ans[n-begins].push_back(n);
            if(n-begins>maxlen) maxlen=n-begins;
        }
//        if(n-begins==0&&p[n-1].h<=k)
//        {
//            ans.push_back(begins);
//            ans.push_back(n);
//            if(n-begins>maxlen) maxlen=n-begins;
//        }
    }
    if(maxlen!=0)
    {
        cout<<maxlen+1<<" "<<ans[maxlen].size()/2<<endl;
        for(int i=0;i<ans[maxlen].size();i+=2)
        {
            cout<<ans[maxlen][i]<<" "<<ans[maxlen][i+1]<<endl;
        }
    }
    else
    {
        cout<<1<<" "<<n<<endl;
        for(int i=1;i<=n;i++)
        {
            cout<<i<<" "<<i<<endl;
        }
    }
    return 0;
}
```

贴个几个简单的代码理解一下吧，比我的代码简单多了。

代码1：

```cpp
#include <stdio.h>
#include <set>
#define forn(i, n) for(int i=0;i<(n);i++)
int n, k, h[100000];
int a, b, r[100000];
int main() {
    scanf("%d%d", &n, &k);
    forn(i, n) scanf("%d", h+i);
    std::multiset<int> s;
    int t=0;
    forn(i, n) {
        s.insert(h[i]);
        while((*s.rbegin()-*s.begin())>k) s.erase(s.find(h[t++]));
        if(i-t+1>a) { a=i-t+1; r[0]=t; b=1; }
        else if(i-t+1==a) { r[b++]=t; }
    }
    printf("%d %d\n", a, b);
    forn(i, b) printf("%d %d\n", r[i]+1, r[i]+a);
    return 0;
}
//by varwat
```

代码2：

```cpp
#include <deque>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

vector <pair<int, int> > seg;
deque <pair<int, int> > mx, mn;

int main() {
    ios_base::sync_with_stdio(false);

    int n, k, h;
    int len = 0, p = 1;

    cin >> n >> k;
    for (int i=1; i<=n; ++i) {
        cin >> h;

        while (!mx.empty() && h > mx.back().first) mx.pop_back();
        mx.push_back(make_pair(h, i));
        while (!mn.empty() && h < mn.back().first) mn.pop_back();
        mn.push_back(make_pair(h, i));

        while (mx.front().first - mn.front().first > k) {
            while (!mn.empty() && mn.front().second <= p) mn.pop_front();
            while (!mx.empty() && mx.front().second <= p) mx.pop_front();
            ++p;
        }

        if (i - p > len) {
            len = i - p;
            seg.clear();
        }
        if (i - p == len) {
            seg.push_back(make_pair(p, i));
        }
    }

    cout << len + 1 << ' ' << seg.size() << endl;
    for (int i=0; i<(int)seg.size(); ++i) cout << seg[i].first << ' ' << seg[i].second << endl;

    return 0;
}
//by delta_4d
```

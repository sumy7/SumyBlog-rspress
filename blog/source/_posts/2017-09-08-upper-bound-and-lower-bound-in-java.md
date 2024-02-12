---
layout: post
title: '用Java实现C++::std中的upper_bound和lower_bound'
date: '2017-09-08 16:30:18'
categories:
  - 算法
tags:
  - c/c++
  - java
  - upper_bound
  - lower_bound
  - 算法
  - 二分
---

# 用Java实现C++::std中的upper_bound和lower_bound

Cpp的Std标准库中包含了很多算法，以前写Cpp的时候受益于Std库，确实方便了不少，在Java语言下还是要慢慢适应Java语言的方式。

Java没有迭代器指针这个概念，所以很多内容与C++有所不同。Java中有二分的实现，叫做`java.util.Arrays.binarySearch()`。使用二分的前提是数组必须有序（从小到大）。如果没有排序，那么方法无法确定返回哪个值。对于有序的数组，如果数组中包含多个相同的目标值，方法也无法保证找到的是哪一个。若找到了目标值，方法会返回目标值所在的下标；如果没有找到目标值，则方法会返回一个可以插入该值的位置，以负数表示 *-(_插入点_ - 1)* 。

C++中也有相应的二分查找函数 `std::binary_search` 不过该函数返回一个 `bool` 型表示有没有找到目标值。相对于二分查找，还是更倾向于使用 `std::lower_bound` 和 `std::upper_boudn` 函数。

## lower_bound

`lower_bound`是找到第一个**大于等于**value的位置，比如 `[1, 2, 3, 3, 3, 4, 7, 8]` 查找 `3` 会返回下标为2的位置，查找 `6` 会返回下标为6的位置。如果未找到则返回数组的长度（C++中会返回end()迭代器的位置）。

首先来看std中的一个实现：

```c
template<class ForwardIt, class T> ForwardIt lower_bound(ForwardIt first, ForwardIt last, const T& value)
{
    ForwardIt it;
    typename std::iterator_traits<ForwardIt>::difference_type count, step;
    count = std::distance(first, last);

    while (count > 0) {
        it = first;
        step = count / 2;
        std::advance(it, step);
        if (*it < value) {
            first = ++it;
            count -= step + 1;
        }
        else
            count = step;
    }
    return first;
}
```

我们照葫芦画瓢，写一个Java的代码：

```java
public int lower_bound(int[] nums, int begin, int end, int value) {
    int count, step, it;
    count = end - begin;

    while (count > 0) {
        it = begin;
        step = count / 2;
        it += step;
        if (nums[it] < value) {
            begin = ++it;
            count -= step + 1;
        } else {
            count = step;
        }
    }

    return begin;
}
```

由于不确定迭代器是不是随机访问迭代器，C++实现比较保守的使用了 `开始位置` 和 `区间长度` 作为二分的指标。不过Java弱化了迭代器的概念，所以可以将数组的版本精简如下：

```java
public int lower_bound(int[] nums, int begin, int end, int value) {
    while (begin < end) {
        int mid = begin + (end - begin) / 2;
        if (nums[mid] < value) {
            begin = mid + 1;
        } else {
            end = mid;
        }
    }
    return begin;
}
```

这样我们就得到了一个相对简单的 `lower_bound` 版本了。

## upper_bound

`upper_bound` 会去寻找**大于**value的位置，比如 `[1, 2, 3, 3, 3, 4, 7, 8]` 查找 `3` 会返回下标为5的位置，查找 `6` 会返回下标为6的位置。

std一种实现如下：

```c
template<class ForwardIt, class T> ForwardIt upper_bound(ForwardIt first, ForwardIt last, const T& value)
{
    ForwardIt it;
    typename std::iterator_traits<ForwardIt>::difference_type count, step;
    count = std::distance(first,last);

    while (count > 0) {
        it = first;
        step = count / 2;
        std::advance(it, step);
        if (!(value < *it)) {
            first = ++it;
            count -= step + 1;
        } else count = step;
    }
    return first;
}
```

根据这个实现，我们可以改成以下代码：

```java
public int upper_bound(int[] nums, int begin, int end, int value) {
    int count, step, it;
    count = end - begin;

    while (count > 0) {
        it = begin;
        step = count / 2;
        it += step;
        if (nums[it] <= value) {
            begin = ++it;
            count -= step + 1;
        } else {
            count = step;
        }
    }

    return begin;
}
```

简化版本如下：

```java
public int upper_bound(int[] nums, int begin, int end, int value) {
    while (begin < end) {
        int mid = begin + (end - begin) / 2;
        if (nums[mid] <= value) {
            begin = mid + 1;
        } else {
            end = mid;
        }
    }
    return begin;
}
```

可以发现，这两个函数只有 `if` 判断那一句不同。

## 总结

`lower_bound` 和 `upper_bound` 的实现借助了 **二分查找** 的思想，二分查找很重要的一点就是对_二分区间的舍弃_。举个例子，`lower_bound`是找到第一个**大于等于**value的值，那么对于**小于等于**mid的值要果断舍弃，大于mid的值由于可能包含value，需要保守一点。

这两个函数的实现到这里就结束了，而关于二分里的区间舍弃保留问题，有空学习一下，再水一篇吧。

## 参考内容

+ [std::upper_bound - cppreference.com](http://en.cppreference.com/w/cpp/algorithm/upper_bound)
+ [std::lower_bound - cppreference.com](http://en.cppreference.com/w/cpp/algorithm/lower_bound)
+ [std::binary_search - cppreference.com](http://en.cppreference.com/w/cpp/algorithm/binary_search)

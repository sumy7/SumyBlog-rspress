---
layout: post
title: Android下smali常用注入代码
date: '2015-05-18 09:44:17'
categories:
  - 编程语言
tags:
  - smali
  - android
  - ctf
---

# Android下smali常用注入代码

这几天做Android的CTF，发现使用smali注入的方式获取Flag的方法比较通用，所以写出来参考一下。

## 简介

通过注入可以将一些内部变量输出到外部来，使一些看不到的内容看到。在Android一般输出的媒介有`Toast`和`Logcat`。

## 注入方式

### Toast方式

```smali
const-string v4, "test"
const/4 v5, 0x1
invoke-static {p0, v4, v5}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;
```

可以将第三行的`v4`寄存器换成需要查看的寄存器。

### Logcat方式

```smali
const-string v3, "Log Tag"
invoke-static {v3, v1}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I
```

同样可以将第二行`v1`寄存器换成需要的寄存器。

## 注意事项

### 寄存器数量

在smali中，每个 `.method` 方法中都会用 `.locals` 声明需要寄存器的数量，在注入的时候要修改寄存器的数量进行扩充。

### 格式转换

要查看的寄存器的内容需要为 `String` 类型，如果不是就需要转换。

#### int转String

```smali
invoke-static {v1}, Ljava/lang/Integer;->toString(I)Ljava/lang/String;
move-result-object v4
```

`v1` 为需要查看的int类型寄存器，转换后的结果存放到 `v4` 中。

#### boolean转String

```smali
invoke-static {v1}, Ljava/lang/Boolean;->toString(Z)Ljava/lang/String;
move-result-object v4
```

`v1` 为需要产看的boolean类型寄存器，转换后的结果存放到 `v4` 中。

### 常用数据类型

| smali | Java                   |
| ----- | ---------------------- |
| V     | void 只能用于返回值类型|
| Z     | boolean                |
| B     | byte                   |
| S     | short                  |
| C     | char                   |
| I     | int                    |
| J     | long (64 bits)         |
| F     | float                  |
| D     | double (64 bits)       |

## 参考内容

+ [Android 反汇编Smali语言中插入log打印 | 学步园](http://www.xuebuyuan.com/2174077.html)
+ [Smali语法：数据类型、方法和字段](http://liuzhichao.com/p/912.html)

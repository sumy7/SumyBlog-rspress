---
layout: post
title: CTF Mobile 基础入门
date: 2023-06-02 12:30:00
categories:
  - 技术
tags:
  - ctf
  - mobile
  - android
  - ios
---

# CTF Mobile 基础入门

> 最近参加了公司组织的 CTF 比赛，混了一个还算不错的成绩，将当时分享的 Mobile 部分的提纲拿出来记录一下。

mobile指移动端APP的相关题目。

## Android

### 准备的工具

- 电脑，推荐程度windows>linux>mac>mac M1
- apk解包反编译工具
    - bytecode-viewer https://github.com/Konloch/bytecode-viewer
    - jd-gui https://github.com/java-decompiler/jd-gui
- so 文件逆向
    - IDA Pro
    - Binary Ninja
    - Ghidra
    - 52pojie的网盘 https://down.52pojie.cn/Tools/Disassemblers/

### 基础知识

先正向了解APK，为逆向打好基础。建议自己写一个APK，了解APK的生产过程和基本结构。

- APK实际上是一个zip压缩包
- 资源文件xml会进行编译压缩，转成二进制格式。注意关注AndroidManifest.xml文件
- java/kt文件编译生成class，压缩生成dex格式文件
- jni技术加载so文件，so文件是NDK编译生成的，一般用C++语言编写

### 解题思路

1. 阅读题目要求，安装APK到手机，查看APK的主要功能
2. 反编译APK文件，查看反编译结果。了解APK内部的调用关系。
3. 确定核心逻辑/核心漏洞，查找资料，构造破解方法
4. 破解APK，获取flag

**核心逻辑**

- dex -> java语言
- so -> 汇编语言
- Android漏洞

### 题目讲解

根据核心逻辑选取了三个题目重点说明一下。

#### 数学家

反编译APK，确定核心逻辑在Java代码中。  
阅读反编译后的代码，关键在随机种子爆破  
查询相关资料，编写随机种子爆破的程序  
找到了随机种子和随机数，代入解密代码获取flag

#### 多少个MD5

反编译APK，确定核心逻辑在so文件中。  
IDA pro打开so文件，找到so文件对应的方法位置。  
按下神奇的F5进行反编译。  
阅读代码（合理）猜测逻辑。  
在线解谜md5，获取前4段，破解最后一段
拼接组成flag

#### 重定向进阶

反编译APK，确定核心逻辑需要利用Intent重定向获取apk的私有文件。
查找Intent重定向相关资料，（2021ByteCTF）
根据资料，获取漏洞的相关知识，编写漏洞利用poc
执行poc，获取flag

## IOS

我也不会🤦🏻‍♀️（下次一定

## 总结

- 工具的运用
- 搜索引擎的大力帮助
- 合理的猜测+运气

## 未来展望（押题）

- docker android模拟器，自己写apk进行攻击
- smali插桩
- wasm

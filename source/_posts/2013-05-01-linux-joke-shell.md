---
layout: post
title: 来两发整人命令
date: '2013-05-01 00:00:00'
categories:
  - 服务器与系统
tags:
  - linux
  - shell
  - 姿势
---

# 来两发整人命令

> 今天不小心又发现了一个有意思的东东，我不会告诉你我是在微博上看到的。有胆量可以来试试呀。

## No.1 `:() { :|:& }; :`

也许你见过或者没有见过这个命令`:() { :|:& }; :`，这个在linux下运行会出现神奇的效果。建议不要尝试。。。

好了，玩笑少说，其实我也没有试过，跪求各位勇士准备好Power键前来尝试。
这个命令的原理就是定义一个函数，不断制造后台任务。这个函数名就是一个冒号。

写的通俗点就是：

```shell
func () {                 //函数定义，这里把函数名改成了func
	func | func &         //管道符连接的命令貌似会同时开始【也有可能是倒序开始来IO阻塞，我对bash研究不深】，所以当下一个func被调用时，一个后台的func已经建立
}
func                      //那么开始滚雪球，准备好随时power键
```

## No.2 `echo '十人|日一|十十o' | sed 's/.../&\n/g' `

这个命令输出几行字符串，没多大的用途。

> 十人|
> 日一|
> 十十o

原命令从表面上来看是将 '...' 替换为 '&\n' ，但是 '...' 是表示每匹配三个字符， '&' 是匹配项的占位符， '\n' 就这是换行符了，所以输出是每三个字符就换一行。“幹! ”

还是不太好理解， Linux 的 shell 还有好多值得研究的地方呀。

## 参考内容

+ [:() { :|:& }; : - 打天打鸭 - ITeye技术网站](http://gembler.iteye.com/blog/360241)
+ [linux :() { :|:& }; : 什么意思_百度知道](http://zhidao.baidu.com/question/307399561.html)

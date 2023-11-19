---
layout: post
title: '使用PHP:proc_open()执行命令并获取输出'
date: '2015-11-28 19:48:15'
categories:
  - 编程语言
tags:
  - php
  - shell
reference:
  - url: 'http://php.net/manual/zh/function.proc-open.php'
    title: 'PHP: proc_open - Manual'
  - url: >-
      http://stackoverflow.com/questions/3261994/executing-jar-file-from-php-through-cmd-prompt-and-capturing-output
    title: Executing .jar file from PHP through cmd prompt and capturing output
---

# 函数原型

(PHP 4 >= 4.3.0, PHP 5, PHP 7)
proc_open — 执行一个命令，并且打开用来输入/输出的文件指针。

```php
resource proc_open ( string $cmd , array $descriptorspec , array &$pipes 
                    [, string $cwd [, array $env [, array $other_options ]]] )
```

具体介绍可以参考[php.net上的文档](http://php.net/manual/zh/function.proc-open.php)。

# 应用

参考php.net上面的例程，修改了一下写成一个小的php程序，用来测试php执行命令的情况，也可以用来测试服务器上php的环境变量问题。

{% gist ad00abd11de4ad1dc13f commandtest.php %}

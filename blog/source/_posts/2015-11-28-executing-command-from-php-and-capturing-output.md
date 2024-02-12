---
layout: post
title: '使用PHP:proc_open()执行命令并获取输出'
date: '2015-11-28 19:48:15'
categories:
  - 编程语言
tags:
  - php
  - shell
---

# 使用PHP:proc_open()执行命令并获取输出

## 函数原型

(PHP 4 >= 4.3.0, PHP 5, PHP 7)
proc_open — 执行一个命令，并且打开用来输入/输出的文件指针。

```php
resource proc_open ( string $cmd , array $descriptorspec , array &$pipes 
                    [, string $cwd [, array $env [, array $other_options ]]] )
```

具体介绍可以参考[php.net上的文档](http://php.net/manual/zh/function.proc-open.php)。

## 应用

参考php.net上面的例程，修改了一下写成一个小的php程序，用来测试php执行命令的情况，也可以用来测试服务器上php的环境变量问题。

```php
<?php
/**
 * Test executing command from php.
 * reference: http://php.net/manual/zh/function.proc-open.php
 * User: Sumy
 * Date: 2015/11/28 0028
 * Time: 19:57
 */

$descriptorspec = array(
    0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
    1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
//  2 => array("file", "/tmp/error-output.txt", "a") // stderr is a file to write to
    2 => array("pipe", "w")  // stderr is a pipe that the child will write to
);

$command = isset($_GET["command"]) ? $_GET["command"] : "java -version";
$stdin = isset($_GET["stdin"]) ? $_GET["stdin"] : "";
$cwd = '/tmp';
// $env = array('some_option' => 'aeiou');

$process = proc_open($command, $descriptorspec, $pipes, $cwd, null);

echo "
<form method='get' action='commandtest.php'>
<h1>command</h1>
<input type='text' name='command' value='$command'>
<h1>stdin</h1>
<input type='text' name='stdin' value='$stdin'>
<input type='submit' value='run it!'>
</form>
";

if (is_resource($process)) {
    // $pipes now looks like this:
    // 0 => writeable handle connected to child stdin
    // 1 => readable handle connected to child stdout
    // Any error output will be appended to /tmp/error-output.txt

    fwrite($pipes[0], $stdin);
    fclose($pipes[0]);

    echo "<h1>stdout</h1>";
    echo "<pre>";
    echo stream_get_contents($pipes[1]);
    fclose($pipes[1]);
    echo "</pre>";

    echo "<h1>stderr</h1>";
    echo "<pre>";
    echo stream_get_contents($pipes[2]);
    fclose($pipes[2]);
    echo "</pre>";

    // It is important that you close any pipes before calling
    // proc_close in order to avoid a deadlock
    $return_value = proc_close($process);

    echo "<h1>command return</h1>";
    echo "<pre>";
    echo "$return_value";
    echo "</pre>";
}
```

## 参考内容

+ [PHP: proc_open - Manual](http://php.net/manual/zh/function.proc-open.php)
+ [Executing .jar file from PHP through cmd prompt and capturing output](http://stackoverflow.com/questions/3261994/executing-jar-file-from-php-through-cmd-prompt-and-capturing-output)

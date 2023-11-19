---
layout: post
title: SSH的转义字符
date: '2015-11-10 23:13:18'
categories:
  - 高效生活
tags:
  - ssh
  - shell
  - linux
reference:
  - url: 'http://dada.tw/2008/01/02/73/'
    title: SSH Escape Character
  - url: 'http://blogread.cn/it/article/6724'
    title: 如何的退出无响应的 SSH 连接
---

SSH 有一个转义字符（Escape Character），今天在微博上看到如何结束无响应的SSH的时候才了解到了它。

转义字符必须在 **换行之后的第一个字符输入** ，如果已经输入了其它内容，即使按了退格键也是没有效果的。这个时候需要按Enter之后再重新输入。

默认在终端输入可以看到帮助：

```
[root@vps2 ~]# ~?
Supported escape sequences:
 ~.   - terminate connection (and any multiplexed sessions)
 ~B   - send a BREAK to the remote system
 ~C   - open a command line
 ~R   - request rekey
 ~V/v - decrease/increase verbosity (LogLevel)
 ~^Z  - suspend ssh
 ~#   - list forwarded connections
 ~&   - background ssh (when waiting for connections to terminate)
 ~?   - this message
 ~~   - send the escape character by typing it twice
(Note that escapes are only recognized immediately after newline.)
```

如果想退出终端，可以使用 `~.`。听说可以优雅的断开没有响应的SSH连接。
`~^Z`（~ 然后 Ctrl+Z）可以将当前SSH进程切换到后台，之后再回去可以输入fg即可。
若不想使用`~`作为转义字符，可以使用`-e`参数修改为其它的字符。例如将转义字符修改为`#`：

```
ssh -e "#" myhost.mydomain.com
```

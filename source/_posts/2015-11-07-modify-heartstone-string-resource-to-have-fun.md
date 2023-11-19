---
layout: post
title: 修改炉石传说客户端显示字符串
date: '2015-11-07 01:16:45'
categories:
  - 游戏人生
tags:
  - heartstone
  - 技巧
  - 个性化
description: 炉石传说显示的文字是可以修改的，通过修改文字有更好的自定义性（个性）。
---

受[@笔良文昌](http://weibo.com/u/1586244430)的推荐，看到了王师傅的这个视频，可以修改一下炉石传说的客户端。

{% video '<iframe height=498 width=510 src="http://player.youku.com/embed/XNzM1MDM5NjEy" frameborder=0 allowfullscreen></iframe>' %}

简单说明一下步骤：
1. 找到炉石传说的文件夹的资源文件，一般存放在`$HEARTSTONE/Strings/$LA/`目录下，`$HEARTSTONE`为炉石传说主文件夹，`$LA`为语言。
    + `GAMEPLAY_AUDIO.txt` 存放的是游戏语音对应的文本
    + `GAMEPLAY.txt` 存放战斗界面的文本
    + 其它txt文件也有相应的文本，打开文件就可以看出来
2. 用文本编辑器打开，由于换行符的原因，最好不要使用系统自带的记事本打开。
3. 文件的一般格式为，有的文件可能没有“声音文件”部分。只替换TEXT文本即可，不要增加或删除原有的空格。
> 标签 文字 备注 声音文件
> TAG TEXT COMMENT AUDIOFILE

4. 修改完之后，请做好“修改完成文件”的备份。战网每次启动时可能会检查资源文件，发现修改会自动替换回去，所以每次启动游戏的时候都要替换一遍。

也就这么多了，希望能在游戏中找到自己的乐趣。这才是游戏本身的使命。

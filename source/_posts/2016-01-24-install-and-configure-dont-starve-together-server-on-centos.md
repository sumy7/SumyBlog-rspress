---
layout: post
title: CentOS下安装和配置饥荒联机版服务器
date: '2016-01-24 16:57:14'
categories:
  - 游戏人生
tags:
  - 游戏
  - 饥荒
  - 服务器
  - centos
reference:
  - url: 'https://developer.valvesoftware.com/wiki/SteamCMD#Linux'
    title: SteamCMD
  - url: >-
      http://dont-starve-game.wikia.com/wiki/Don%E2%80%99t_Starve_Together_Dedicated_Servers
    title: Guides/Don’t Starve Together Dedicated Servers
  - url: >-
      https://www.linode.com/docs/applications/game-servers/dont-starve-together-on-ubuntu
    title: Install and Configure Don’t Starve Together Server on Ubuntu 14.04
  - url: >-
      http://changshiban.com/2015/04/11/dont-starve-together-dedicated-server-create-on-linux/
    title: 生存类游戏 Don't Starve Together（饥荒联机版）Linux 专用服务器的搭建
  - url: 'http://www.lyun.me/lyun/427'
    title: 饥荒联机版服务端MOD及更多设置
---

最近没啥好游戏玩了，所以就被同学拉着学习打饥荒。。。一起联机的话感觉太慢，正好有台限制的阿里云VPS，就拿来搭个饥荒服务器吧。

# 前期准备

服务器是1GB内存，应该可以供应得起十几个人的联机。

首先要想搭建服务器需要生成一个服务器key。打开饥荒联机版游戏，登录游戏后按 `~` （数字1左边的键）打开控制台输入

```
TheNet:GenerateServerToken()
```

之后就可以在 `C:\Users\Sumy\Documents\Klei\DoNotStarveTogether` 目录下下生成server_token.txt文件，之后需要将此文件放到服务器上。

# 服务器安装

要想安装游戏服务器，需要先安装SteamCMD工具，可以参考[SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD#Linux)的步骤来安装。这里简单说明一下。

## 安装SteamCMD

安装依赖（针对 CentOS 64位）

```
yum install glibc.i686 libstdc++.i686
```

添加用户并切换到steam用户

```
useradd -m steam
su - steam
```

创建steam文件夹

```
mkdir ~/steamcmd
cd ~/steamcmd
```

下载steamcmd

```
wget https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
```

解压

```
tar -xvzf steamcmd_linux.tar.gz
```

## 下载饥荒服务器

解压完成后就可以使用了，下面通过steamcmd下载饥荒的服务器。

运行steamcmd（请在steam用户下操作）

```
cd ~/steamcmd
./steamcmd.sh
```

第一次运行需要初始化和更新，当出现 `Steam>` 提示符的时候就可以输入命令了。

下载饥荒服务器

```
app_update 343050 validate
```

回显

```
 Update state (0x61) downloading, progress: 99.97 (575640569 / 575805881)
 Update state (0x61) downloading, progress: 99.97 (575640569 / 575805881)
 Update state (0x61) downloading, progress: 99.97 (575640569 / 575805881)
 Update state (0x61) downloading, progress: 99.97 (575640569 / 575805881)
Error! App '343050' state is 0x402 after update job.

Steam>

Steam>app_update 343050 validate
 Update state (0x61) downloading, progress: 99.97 (575640569 / 575805881)
 Update state (0x61) downloading, progress: 99.97 (575640569 / 575805881)
Success! App '343050' fully installed.

Steam>quit
```

这一步可能比较慢，耐心等待一下，网络中断的话就重新下载一次。这里的`343050`是饥荒游戏的ID，如果要下载其它游戏，只需改成其它游戏的ID即可。

# 服务器配置

和Windows的目录类似，游戏会被下载到 `/home/steam/Steam/steamapps/commom` ，可以去此目录找到SteamCMD下载的游戏。

进入饥荒游戏的`bin`目录，运行

```
./dontstarve_dedicated_server_nullrenderer
```

这时候可能会显示

```
./dontstarve_dedicated_server_nullrenderer: error while loading shared libraries: libcurl-gnutls.so.4: cannot open shared object file: No such file or directory
```

在CentOS下没有这个链接库，可以用其它的库代替一下

```
ln -s /usr/lib/libcurl.so.4 /usr/lib/libcurl-gnutls.so.4 && ldconfig
```

另外也可以使用 `ldd ./dontstarve_dedicated_server_nullrenderer` 来查看程序缺少的动态链接库。

这时候再运行就不报错了，如果还报错就将报错信息谷歌一下。接下来就会出现以下信息

```
[200] Account Failed (6): "E_INVALID_TOKEN"
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!! Your Server Will Not Start !!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
No auth token could be found.
To generate a server_token you must
open the console from a logged-in game
client with the tilda key (~) and type:
TheNet:GenerateServerToken()
This will create 'server_token.txt' in
your client settings directory. Copy this
into your server settings directory.
```

提示缺少server token，准备工作的时候已经生成了server_token.txt，我们需要将其放到服务器上，不能直接打开然后粘贴到控制台里，最好通过传输工具。

可以考虑使用`scp`命令上传

```
scp ~/Documents/Klei/DoNotStarveTogether/server_token.txt user@12.34.56.78:/home/steam/.klei/DoNotStarveTogether/
```

在`/home/steam/.klei/DoNotStarveTogether/`目录下找到上传的server_token.txt就可以了，还可以在此目录下找到服务器的配置文件`settings.ini`，参考以下模板将配置文件修改一下，由于饥荒不支持Unicode字符，所以做好不要使用中文。

```
[network]
default_server_name = Your unique server name
default_server_description = A very nice server description
server_port = 10999
server_password = password
max_players = 1 .. 64
pvp = true | false
game_mode = endless | survival | wilderness
enable_autosaver = true | false
tick_rate = 30
connection_timeout = 8000
server_save_slot = 1
enable_vote_kick = true | false
pause_when_empty = true | false

[STEAM]
DISABLECLOUD = true

[MISC]
CONSOLE_ENABLED = true
autocompiler_enabled = true
```

之后运行服务器就会生成一个默认的世界了。

这时候去[http://my.jacklul.com/dstservers](http://my.jacklul.com/dstservers)看一看服务器列表上有没有你的服务器就行了。

# MOD安装

mod可以为服务器生存增加便利性和可玩性。加入mod的服务器无法通过直连方式（`c_connect`命令）连接了，需要通过在线列表搜索进入。

首先，需要先从创意工坊里下载mod，修改`dedicated_server_mods_setup.lua`文件可以让服务器每次启动的时候自动加载和更新mod，该文件位于`/home/steam/Steam/steamapps/common/Don't Starve Together Dedicated Server/mods` 文件夹。向下面这样添加，数字为创意工坊中mod的编号。

```
ServerModSetup("345692228")
ServerModSetup("346968521")
ServerModSetup("352373173")
ServerModCollectionSetup("379114180")
```

下载mod之后服务器不会自动加载，需要继续配置要加载的mod，这里有两种方法。

第一种方法修改`modsettings.lua`文件强制加载mod，这个文件在`mods`文件夹下可以找到。使用这种方法加载的mod会以默认配置启动，而且无法修改配置，无法在多服务端下隔离配置。

```
ForceEnableMod("workshop-345692228")
ForceEnableMod("workshop-346968521")
ForceEnableMod("workshop-352373173")
```

第二种方法修改`modoverrides.lua`文件返回mod信息进行加载。该文件在`/home/.klei/DoNotStarveTogether`文件夹下。这种方法可以隔离不同服务端的配置，而且可以根据需要修改mod的配置。推荐以这种方式加载mod。

```
return {
    ["workshop-371920345"] = { enabled = true },
    ["workshop-347079953"] = { enabled = true },
    ["workshop-458940297"] = { enabled = true },
    ["workshop-378160973"] = { enabled = true },
    ["workshop-375859599"] = { enabled = true },

    ["workshop-361336115"] = { enabled = true,
        configuration_options =
        {
            hunt_time = 6,
            ["String Phrase Option Name"] = "some value",
        }
    },
}
```

# 脚本命令

可以创建一个启动脚本来启动，如果运行之后缺少`screen`命令，可以通过yum进行安装。

```shell
#!/bin/sh
cd /home/steam/Steam/steamapps/common/Don\'t\ Starve\ Together\ Dedicated\ Server/bin
/usr/bin/screen -S "DST" /bin/sh -c './dontstarve_dedicated_server_nullrenderer -console'
```

运行脚本之后可以使用快捷键 `Ctrl + A, D` (按住Ctrl然后依次按A和D)切换到后台，要将其切换到前台，可以输入`screen -r DST`命令。

如果是管理员的话可以在客户端使用控制台（`~`键，在1的左边）执行命令，附一些服务器常用的命令：

> TheNet:Kick(userid) 踢出玩家
> TheNet:Ban(userid) 禁止玩家
> c_save() 立即保存
> c_reset(true|false) true保存并重新加载世界，false不保存直接重新加载当前世界
> c_regenerateworld() 重新生成世界
> c_shutdown(true|false) true保存并关闭当前世界，false不保存直接关闭当前世界
> TheNet:SetAllowIncomingConnections(true|false) true允许他人加入，false阻止任何人加入
> c_rollback(count) 回档

---
layout: post
title: Steam控制台命令
date: '2016-02-09 20:54:41'
categories:
  - 游戏人生
tags:
  - steam
  - 控制台
  - 命令
---

# Steam控制台命令

今天在Steam上玩游戏的时候，发现游戏被锁区了，于是想看一看游戏许可证所在的分区，然后就发现Steam可以使用控制台命令。

## 开启控制台模式

要启动控制台模式，需要给Steam添加启动参数。在Steam快捷方式上右键，属性。然后添加`-console`参数。

![快捷方式添加参数](./1.jpg)

启动Steam就可以看到CONSOLE选项卡了。

![CONSOLE选项卡](./2.jpg)

## 使用控制台

切换到Console选项卡，输入命令就可以使用了，会有命令提示。

使用 `user_info` 查看一下账号信息

```
] user_info
Account: ...
SteamID: [...] (...)
Email: ... (Validated)
Logon state: Logged On
Language: schinese

Persona Name: ...
Persona State: Online
Direct Friends: 0
Groups Friends: 0

InstallPath: F:\Steam
Universe: Public
Server Time: ...
IPCountry: US
Offline Mode: no
CellID: 46
```

可以从回显信息中看到Steam账号的SteamID等一些基本信息。还有 `licenses_print` 命令也可以尝试一下，可以查看游戏许可证的许可区域、付款来源等。

发现 `IPCountry` 被识别成 `US`（美国）了，于是锁区的游戏就无法启动了。遇到这个问题需要关闭VPN，然后退出Steam一段时间，再进入Steam就可以了。重启Steam是无效的，需要关闭Steam客户端一段时间。

## 控制台命令

官方没有找到帮助文档，只好找了一个第三方的命令和启动参数，权当一个参考吧。

启动参数

```
-applaunch 游戏数字ID 游戏启动参数
    //直接通过命令行启动游戏，需要加入游戏的数字ID和对应游戏启动参数。
-cafeapplaunch
    //以网吧模式启动游戏，强制启动前验证游戏数据。
-clearbeta
    //如果参加了Steam的Beta活动，可以加入此参数清除。
-complete_install_via_http
    //默认按照HTTP协议方式完成安装。
-console
    //除错模式，在Steam中增加控制台，可以查看Steam活动信息。
    //主要是Steam程序自身的活动，比如打开游戏，注册游戏等记录。
-dev或者-developer
    //开发者模式，在Steam中增加控制台，可通过指令操作查看各种信息。
    //在底部命令行输入栏可以输入任何字母得到相关字母开头的命令提示进行选择。
    //按F6或者F7可以进行界面皮肤参数设置。
-forceservice
    //强制以服务方式启动Steam，需要管理员权限。
-install 安装路径
    //从指定安装路径安装游戏。
-language 语言
    //指定Steam程序界面语言，例如：english。
-login 用户名 密码
    //直接登录Steam，而不需要手动输入账号密码。
    //通过此法可以创建多个账号登录的快捷方式而无需每次切换用户。
    //公用电脑不要选择此种方式，会泄漏帐号密码资料。
-silent
    //静默启动Steam程序并在系统通知区域显示图标。
    //点击右下角图标后才会显示程序主界面。
    //如果没有选择保存密码，那么依然会显示登录窗口。
-single_core
    //强制Steam运行于首选CPU。
-tcp
    //强制指定Steam程序使用TCP协议而不是默认的UDP协议。
-voice_quality 数字
    //设置语音通话质量，范围从1至3。全部参数请参照官方文档：Command Line Options
```

控制台命令

```
batterypercent 查看剩余电量百分比
batterytime 查看剩余电池使用时间
ClientStatsUploadRateSeconds 客户端状态上传时间间隔
config_refresh 刷新设置
clear_console 清空控制台内容记录
cloud_sync_up 指定上传游戏的云存储数据，命令后跟游戏数字ID
cloud_sync_down 指定下载游戏的云存储数据，命令后跟游戏数字ID
license_for_app 查看指定游戏的注册信息，命令后跟游戏数字ID
licenses_print 查看登记在Steam下的游戏注册信息，包括购买时间，所属区域，授权状态等
licenses_print3 显示内容和licenses_print类似
p2p_connecttimeout 查看P2P连接超时时间
p2p_unusedtimeout 查看P2P未使用超时时间
quit 退出Steam程序
service_repair 修复Steam客户端服务
service_test 测试Steam客户端服务
service_restart 重新启动Steam客户端服务
user_friends 查看用户好友
user_info 查看用户信息
windows_info 查看主板，BIOS等信息。
```

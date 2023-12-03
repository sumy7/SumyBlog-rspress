---
layout: post
title: 小米电视 6095 端口 HTTP API 整理
date: 2022-08-05 22:00:00
categories: [ 技术 ]
tags: [ 小米电视, api ]
---

# 小米电视 6095 端口 HTTP API 整理

小米电视在 6095 端口有一个内置的服务，很神奇的导出了一些 API 接口。

## 获取电视基础信息

```json5
// http://xxx.xxx.xxx.xxx:6095/request?action=isalive

{
  "status": 0,
  "msg": "success",
  "data": {
    "devicename": "客厅的小米电视",
    "ip": "xxx.xxx.xxx.xxx:6095",
    "feature": [
      "power"
    ],
    "url": [
      "http://bilibili.kankanews.com/video/av\\d+/",
      "http://www.bilibili.tv/video/av\\d+/"
    ],
    "platform": 630,
    "build": 1267,
    "version": 16777510
  }
}
```

## 获取电视安装的APP

```json5
// http://xxx.xxx.xxx.xxx:6095/controller?action=getinstalledapp&count=999&changeIcon=1

{
  "status": 0,
  "msg": "success",
  "data": {
    "AppInfo": [
      {
        "PackageName": "com.mitv.alarmcenter",
        "IconURL": "http://xxx.xxx.xxx.xxx:6095/request?action=getResource&name=com.mitv.alarmcenter0.png",
        "AppName": "定时提醒",
        "Order": 1
      },
      {
        "PackageName": "com.ktcp.video",
        "IconURL": "http://xxx.xxx.xxx.xxx:6095/request?action=getResource&name=com.ktcp.video0.png",
        "AppName": "云视听极光",
        "Order": 2
      },
    ]
  }
}
```

## 启动APP

```json5
// http://xxx.xxx.xxx.xxx:6095/controller?action=startapp&type=packagename&packagename=com.xiaomi.tweather

{
  "status": 0,
  "msg": "success",
  "data": null
}
```

## 按键输入

```json5
// http://xxx.xxx.xxx.xxx:6095/controller?action=keyevent&keycode=enter

{
  "status": 0,
  "msg": "success",
  "data": {}
}
```

keycode 可以是以下值：

| keycode    | 功能    |
|------------|-------|
| power      | 设备开关  |
| up         | 控制光标上 |
| down       | 控制光标下 |
| left       | 控制光标左 |
| right      | 控制光标右 |
| enter      | 确认键   |
| home       | 返回桌面  |
| back       | 回退键   |
| menu       | 打开菜单  |
| volumeup   | 增加音量  |
| volumedown | 减小音量  |

---
layout: post
title: 使用Python+Mongodb+NodeJS实现一个票数记录网站
date: '2016-02-29 10:15:37'
categories:
  - 实践
tags:
  - nodejs
  - mongodb
  - python
---

# 使用Python+Mongodb+NodeJS实现一个票数记录网站

之前刷微博的时候看过一个网站[买下 Steam 所有游戏要花多少钱？](http://steamtuhao.com/)，发现它的实现使用的是 **Python后台** 加 **NodeJS展示** 。前几天 _天二_ 发来了一个投票网站，在研究了一番之后找到了刷票的方法。再加上想用NodeJS干点事情，于是在这些乱七八糟的事情的驱动下，这个网站的想法就这样诞生的。NodeJS和Mongodb都是现学现卖的，至少能达到预期的效果了。

## 数据源网站分析

由于活动要到5月份才结束，为了不必要的麻烦，就不打算暴露网址了。也请自行脑补一些图片吧。

最初投票网站是分享到朋友圈的，通过分享的链接访问投票选手网页，点击“投票”就为该选手投上一票，多次投票只能算一票。

为了调试方便，将链接提取到电脑浏览器上，却提示 **需要在微信中打开**，最初想到是不是判断的UserAgent，于是找了一个Android微信浏览器的UserAgent试了一下，发现不行。这就纠结了，然后天二告诉说用iPhone的UserAgent是可以的，这...无语了...

```
Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12A365   MicroMessenger/5.4.1 NetType/WIFI
```

打开网页之后，需要研究投票逻辑。简单看了JS代码之后，发现投票按钮根本啥事情也没有做，那票是怎么投上去的？经过一系列的猜想和实验之后，发现了一个惊天的结论：网页通过Cookie判断是否多次投票，而投票只需访问一下网页就可以了...就可以了...就可以了...

~~天二说，好想去创业呀...~~

## Python抓取数据

也好也好，网站简单程序也就简单了。一段投票+抓取数据的代码就这样诞生了：

```python
import urllib2

url = 'http://balabala.com' # 数据源网址
useragent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12A365   MicroMessenger/5.4.1 NetType/WIFI'
request = urllib2.Request(url)
request.add_header('User-Agent', useragent) # 设置UserAgent
reader = urllib2.urlopen(request)
html = reader.read().decode('gbk')
print html # 打印网页源代码
```

网页源代码抓取到了，需要分析源代码的数据。这里主要抓取网页里的排行榜，排行榜在一个 `table` 中显示，而整个网页只有一个table。使用Python的`HTMLParser`库解析网页源代码。下面给出一个大致框架：

```python
from  HTMLParser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.tag = None

    def handle_starttag(self, tag, attrs):
        if tag == 'td':
            self.tag = 'td'

    def handle_endtag(self, tag):
        if self.tag == 'td':
            ... # 标签闭合时处理保存数据
        self.tag = None

    def handle_data(self, data):
        if self.tag == 'td':
            ... # 临时记录数据
            print data

... #省略抓取代码
parser = MyHTMLParser()
parser.feed(html)
```

然后就是定时任务了，不想使用无限循环，就参考使用`crontab`来执行定时任务。执行并在最后一行输入以下命令：

```
$ crontab -e
*/20 * * * * python main.py
```

这句话的意思是 **每隔20分钟执行一次后面的命令**，其它写法可以查阅相关资料。貌似后台数据端准备完毕了。

## Mongodb数据库构建

选择Mongodb的原因有两个：一是不想用MySql了，二是没用过Mongodb。首先果然还是从安装搭配环境开始吧。

Windows下安装，首先到[https://www.mongodb.org/downloads](https://www.mongodb.org/downloads)来下载安装包，安装之后找到安装目录，运行命令 `mongod --dbpath "数据库路径" --logpath "日志路径\MongoDB.log" --install --serviceName "MongoDB"`，这样会以服务模式运行Mongodb数据库。

Linux下安装，也需要到[https://www.mongodb.org/downloads](https://www.mongodb.org/downloads)来下载安装包，解压到`\usr\local\mongodb`目录下，创建配置文件mongodb.conf，配置开机启动。

mongodb.conf
```
dbpath=/usr/local/mongodb/db
logpath=/usr/local/mongodb/logs/mongodb.log
port=27017
fork=true
nohttpinterface=true
```

配置开机启动
```
vi /etc/rc.d/rc.local
/usr/local/mongodb/bin/mongod --config /usr/local/mongodb/bin/mongodb.conf
```

Python可以使用`pymongo`来连接Mongodb数据库，Windows下可以下载模块安装包，Linux下用`pip`安装：

```python
import pymongo
import random

conn = pymongo.Connection("127.0.0.1",27017)
db = conn.test # 连接库
db.user.save({'id':1,'name':'kaka','sex':'male'}) # 插入一个数据
```

NodeJS需要`mongodb`和`monk`模块连接Mongodb数据库，使用`npm`安装：

```javascript
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');

var collection = db.get('user');
collection.find({}, {}, function (e, timedocs) {
    ...
}
```

这里简单介绍了Mongodb的安装和连接方式。

## NodeJS展示

有了数据和数据库，就需要一个展示页面了。框架选定了Express，第一次用说一下了解的地方。

**安装** 需要安装`node`和`npm`，一般发行版的软件库中都包含吧，手动安装去找摆渡吧。

**框架** 如果有个IDE那就再好不过了，也可以手动下载Express。具体怎么安装还是看个人喜好吧。

**路由** 第一次接触这种需要手动书写路由规则的方式。Express的路由规则分为两部分，`app.js`和`routes`目录下的文件。首先在`app.js`中指定哪个目录由哪个路由解析，然后在`routes`下配置相应的路由文件。

**数据库** 数据库最好是维持一个连接，而不是每有一个请求到来就建立一个连接。实现的方式是在`app.js`中建立连接，然后在routes中引用这个数据库连接。这里贴出一个`app.js`的代码，可以参考这段代码的注释。在路由中通过`req.db`就可以取到数据库引用了。

```javascript
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 数据库连接放到这里
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 将db分发到router里，注意放在'\'路由的前面
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes); // ---放在**这**前面---
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
```

**启动** 开发环境和部署环境的运行是不同的，部署环境下需要能在后台运行。可以在网站目录下运行 `PORT=3000 nohup npm start &` 命令，`PORT`通过环境变量来修改启动端口，`nohop`配合`&`实现后台执行。

**其它** 诸如如何书写页面，如何传参渲染，这些问题可以参考Express框架里的默认页面。

## 服务器和域名

服务器使用阿里云的服务器，将以上内容部署上去之后打算绑上一个域名，参考 _土豪_ 那篇文章，打算就使用Nginx做转发。

安装Nginx，打开配置文件`vim /etc/nginx/nginx.conf`，添加一段内容：

```
server {
  listen 80;
  server_name steamtuhao.com www.steamtuhao;    # ←写你的域名

  location / {
    proxy_pass http://127.0.0.1:3000;    # ←写你的端口
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

注意域名和端口。然后重启Nginx `service nginx restart`。

很顺利，不过遇到了一个问题，域名需要备案。算了，还是乖乖用IP访问吧。

## 总结

这次实现过程用了一天多的时间，其实主要的时间都用在研究图表插件的展示问题，这里没有提到这部分内容。

整个实现的功能就是，Python每隔20分钟抓取一次数据存储到Mongodb数据库中，Express读取Mongodb展示出来。

至此这部分内容可以告一段落了。

## 参考内容

+ [CentOS6.4 安装MongoDB](http://www.cnblogs.com/kgdxpr/p/3519352.html)
+ [THE DEAD-SIMPLE STEP-BY-STEP GUIDE FOR FRONT-END DEVELOPERS TO GETTING UP AND RUNNING WITH NODE.JS, EXPRESS, JADE, AND MONGODB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/)
+ [买下 Steam 所有游戏要花多少钱？](http://steamtuhao.com/)

---
layout: post
title: 从零开始捣鼓一个Electron应用——文件读取
date: '2017-06-20 23:08:09'
categories:
  - 体验Electron
tags:
  - electron
  - vue
  - fs
  - path
---

今天要实现的一个内容是，选择一个目录，读取目录中的文件，然后把扩展名为 `.md` 文件的文件名和文件大小列举出来，最后展示在表格中。

# 本篇技术栈和主要技能

+ Vue组件的编写（主要是template，不涉及多个组件传递）
+ 通过electron调用系统原生组件（打开文件对话框）
+ fs和path操作文件（获取文件信息）

# 直接贴代码吧

下面代码是单个页面的代码，要使用还要在路由文件 `route/index.js` 中加入路由信息，并在导航栏上添加入口。其它的地方不需要过多的修改。

```html
<template>
  <div class="container">
    <div class="selecter">
      <el-input placeholder="请选择目录" v-model="dictorySelected" :disabled="true">
        <template slot="prepend">
          <el-button type="primary" @click="showFileDialog()">选择目录</el-button>
        </template>
      </el-input>
    </div>
    <div class="datatable">
      <div>共有 {{tableData.length}} 条记录</div>
      <el-table v-loading="isLoading" element-loading-text="拼命加载中" :data="tableData" style="width: 100%">
        <el-table-column prop="filename" label="文件名"> </el-table-column>
        <el-table-column prop="filesize" label="文件大小" fixed="right" width="100"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'file-listing-page',
  data() {
    return {
      dictorySelected: '',
      isLoading: false,
      tableData: []
    }
  },
  methods: {
    showFileDialog() {
      const dialog = require('electron').remote.dialog
      dialog.showOpenDialog({ properties: ['openDirectory'] }, (filename) => {
        if (filename.length === 1) {
          this.dictorySelected = filename[0]
          this.listingFile(this.dictorySelected)
        }
      })
    },
    listingFile(filepath) {
      this.isLoading = true
      const fs = require('fs')
      const path = require('path')
      fs.readdir(filepath, (err, file) => {
        if (err) {
          this.isLoading = false
          return alert(err)
        }
        this.tableData = []
        for (let filename of file) {
          const stat = fs.statSync(path.join(filepath, filename))
          if (stat.isFile()) {
            if (path.extname(filename).toLowerCase() === '.md') {
              this.tableData.push({
                filename: filename,
                filesize: stat.size
              })
            }
          }
        }
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}

.datatable {
  margin-top: 10px;
}
</style>
```

# 果然还是要稍微说明一下

## 打开文件对话框

通过electron可以调用原生的系统组件，这里需要展示打开文件对话框。`require('electron').remote.dialog` 可以引用electron中操作dialog的部分，然后通过`dialog.showOpenDialog()`函数显示打开文件对话框。在回调函数中可以获取到选择的内容。

另外注意的是，electron分为**主进程**和**渲染进程**，我们的这些代码是需要执行在渲染进程中的，因此，需要通过`remote`接口获取主进程的`dialog`对象。

## fs列举文件夹内容

node提供的fs包可以操作文件和文件夹，`fs.readdir(filepath, function(err, file){})`给出一个目录filepath，可以在回调函数中获取到文件信息。

`fs.statSync()` 可以获取文件的状态信息，这是一个同步方法，有返回值。通过返回的stat对象就可以判断当前文件是不是个文件`isFile()`，当然如果不是文件就直接忽略过去。stat中的具体内容可以打个log查看一下。

**异步方法**需要在回调函数里获取函数返回的内容，**同步方法**直接从函数返回值获取。

## path文件名路径操作

`path.extname()` 获取文件的扩展名，包含点号。

`path.join()` 可以将两个目录连接起来，连接的方式可以参考命令CD的方式。

## style scoped

`<style scoped>` 表示当前style只作用于当前template，具体实现方式是编译的时候添加标识符，通过class和标识符双重选中，以限定范围。

# 总结一下

本篇的内容不算太多，主要时间花费在了调试之前界面一个fixed背景不充满的问题上。另外，对函数的不熟悉也会举步维艰。
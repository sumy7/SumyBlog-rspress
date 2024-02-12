---
layout: post
title: 再次从零开始捣鼓一个Electron应用——菜单和再次发布
date: 2021-05-09 18:35:17
categories: 体验Electron
tags: [electron, release, github-actions]
---

# 再次从零开始捣鼓一个Electron应用——菜单和再次发布

时隔一段时间，其实每天还是在断断续续的“水”Electron的功能，本次在菜单和构建问题上又进了一步。i18n功能需要一个切换语言的位置，由于没有设置专门的设置窗口，就把切换语言放置在菜单栏中。Electron默认已经有一部分菜单了，这次就需要在菜单上加上语言列表。另一项任务是发布，每次手动发布也好麻烦（其实也就手动发布了一次而已），这次看看能不能利用Github Actions功能将构建和发布自动化。

<!-- more -->

## 菜单

Electron的菜单通过一个`(MenuItemConstructorOptions | MenuItem)[]`类型数组进行声明，然后在窗口的ready事件后才能执行修改菜单的命令。

修改菜单先是要将菜单模板构建成菜单对象，然后再应用到ApplcationMenu上。

```typescript
const menu = Menu.buildFromTemplate([/* 菜单在这里 */])
Menu.setApplicationMenu(menu)
```

以一个简单菜单来说，一个独立的菜单包含label、accelerator、role这三项。label是菜单展示；accelerator是菜单快捷键；role是菜单角色，有些内置的菜单角色可以触发系统的默认行为，比如undo就会触发撤销行为等。将type设置为separator会绘制一个菜单分隔条。如果默认角色没有符合要求的也可以使用click属性向菜单绑定点击事件。

下面是菜单的一个简单用法：

```typescript
{
  label: 'Edit',
  submenu: [
    {
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    },
    {
      type: 'separator'
    },
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.reload()
        }
      }
    }
  ]
}
```

使用了自定义菜单之后，会丢失默认菜单的配置，如果还想保留默认菜单，建议将默认菜单项重新拷贝一遍，与新菜单合并放置在一起。可以使用[https://github.com/carter-thaxton/electron-default-menu/blob/master/index.js](https://github.com/carter-thaxton/electron-default-menu/blob/master/index.js)提供的模板稍加修改。

## 发布

上篇文章之后，就一直在捣鼓怎么进行更有效的发布操作，初步想法是用Github Actions在push tags操作后，触发构建然后推送将成品推送到release中，以此来替代手动构建上传的操作。

后来发现，原来[electron-builder](https://www.electron.build/)存在构建后自动上传github的方式，而使用的[vue-cli-plugin-electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)引用了electron-builder，自然也存在这项功能。

要想在本地使用，首先需要申请Github Token。打开[Personal Access Tokens](https://github.com/settings/tokens)，选择“Generate new token”，然后将repo下的所有权限选中，生成一个新的token。

```shell
export GH_TOKEN=xxx_xxxxxxxxxxxxxxxxx
vue-cli-service electron:build --mac --win --linux deb tar.xz -p always
```

这样就会在本地构建mac、windows、linux的成品，并上传Github对应仓库的releases里。

除了在本地操作，还可以将这个步骤整理成一个Github Actions，在push的时候自动进行。新建.github/workflows/build.yml文件，并输入以下内容。

.github/workflows/build.yml
```yaml
name: Build/release

on: push

jobs:
  release:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v2.3.4

      - name: Install Node.js, NPM and Yarn
        uses: actions/setup-node@v2.1.5
        with:
          node-version: 14

      - name: Yarn install and release
        env:
          GH_TOKEN: ${{ secrets.github_token }}
        run: |
          yarn install
          yarn run electron:release-${{ matrix.os }}
```

步骤就是用macos、ubuntu和windows这三个操作系统，分别去构建成品。如果存在GH_TOKEN环境变量，会自动触发上传操作。当然这个GH_TOKEN也不需要配置和填写，执行的时候Github会自动生成token并进行替换。

这个Actions构建依赖几个命令，可以提前放在package.json里：

```json
{
  "scripts": {
    // ...
    "electron:release-all": "vue-cli-service electron:build --mac --win --linux deb tar.xz -p always",
    "electron:release-macos-latest": "vue-cli-service electron:build --mac -p always",
    "electron:release-ubuntu-latest": "vue-cli-service electron:build --linux deb tar.xz -p always",
    "electron:release-windows-latest": "vue-cli-service electron:build --win -p always",
    // ...
  }
}
```

然后将文件push到仓库里，就自动创建Github Actions了。以后有push操作的时候，都会自动构建。还会根据当前最新的tag创建版本号，但是这样自动创建的releases是一个草稿状态，还需要手动编辑然后进行发布操作。

## 参考内容

+ [Multi Platform Build - electron-builder](https://www.electron.build/multi-platform-build)

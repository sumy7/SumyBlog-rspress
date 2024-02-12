---
layout: post
title: 一种通过svg-sprite-loader引入svg图标的方法
date: 2021-06-07 22:00:00
categories: [前端]
tags: [webpack, svg]
---

# 一种通过svg-sprite-loader引入svg图标的方法

`svg-sprite-loader` 可以将 svg icon文件整合到一起。利用 svg 的 symbol 元素，将每个 icon 包括在 symbol 中，
通过 use 元素使用该 symbol 。配合 SvgIcon 组件，可以方便的添加和引用 svg 图标文件。

## 安装并配置svg-sprite-loader

首先安装 svg-sprite-loader 插件，并在 webpack 构建文件中进行配置。

引入 svg-sprite-loader 依赖

```shell
npm install svg-sprite-loader -D
yarn add svg-sprite-loader -D
```

在 webpack 中增加配置

```javascript
// 普通webpack
[
  {
    test: /\.svg$/,
    include: paths.appIcons,
    loader: require.resolve("svg-sprite-loader"),
    options: {
      symbolId: "icon-[name]",
    },
  }
]

// vue-cli
{
    chainWebpack(config)
    {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
```

## 引入svg文件

为了让 webpack 处理 svg 文件，还需要在 js 中显式引入（import/require）文件。这里使用一种批量导入方式。

1. 新建存放 svg 图标的文件夹 ./src/icons
2. 在其中创建一个 index.js 文件
```javascript
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
```
3. 将准备好的 svg 图标文件放在 ./src/icons/svg 目录下
4. 在入口文件处引入 ./src/icons/index.js 文件
```javascript
import './icons'
```

## 编写SvgIcon组件

还需要一个组件可以方便的引入打包好的 svg 图标。

### React模式

在 ./src/components/SvgIcon/index.tsx 创建组件。

```jsx
import React from "react";

import "./svg-icon.css";

const SvgIcon = ({ iconClass, className }) => {
  const styleExternalIcon = {
    mask: `url(${iconClass}) no-repeat 50% 50%`,
    WebkitMask: `url(${iconClass}) no-repeat 50% 50%`,
  };

  const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path);

  const svgClass = className ? "svg-icon " + className : "svg-icon";

  const iconName = `#icon-${iconClass}`;

  return (
    <span className="anticon">
      {isExternal(iconClass) ? (
        <div
          style={styleExternalIcon}
          className={`svg-external-icon ${svgClass}`}
        />
      ) : (
        <svg className={svgClass} aria-hidden="true">
          <use xlinkHref={iconName} />
        </svg>
      )}
    </span>
  );
};

export default SvgIcon;
```

PS：为了与 antd 的图标样式保持一致，这里使用了 anticon 类名。

在相同目录下 ./src/components/SvgIcon/svg-icon.css 创建样式文件。

```css
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
```

### Vue模式

创建 ./src/components/SvgIcon.vue 组件文件。

```vue
<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs"/>
  <span v-else class="inline-block align-middle"><svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName"/>
  </svg></span>
</template>

<script>
import { computed, defineComponent } from 'vue'

function checkExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const isExternal = computed(() => {
      return checkExternal(props.iconClass)
    })
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`
    })
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      } else {
        return 'svg-icon'
      }
    })
    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${props.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
      }
    })
    return {
      isExternal,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1.25em;
  height: 1.25em;
  vertical-align: -0.225em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
```

## 使用图标

iconClass 属性是放置在 ./src/icons/svg 目录下文件的名称。

className 属性是补充的样式类名。

在 React 中使用

```jsx
import React from 'react';
import './App.css';
import SvgIcon from '@/components/SvgIcon'

function App() {
  return (
    <div>
      <SvgIcon iconClass='user' />
      <SvgIcon iconClass='https://emoji.lonelyion.com/svg/1f418.svg' className='pink' />
    </div>
  );
}

export default App;
```

在 Vue 中使用

```vue
<template>
  <div>
    <div class="icon-custom">
      <svg-icon icon-class="user" />
    </div>
    <div class="icon-custom">
      <svg-icon icon-class="https://emoji.lonelyion.com/svg/1f418.svg" />
    </div>
  </div>
</template>
```

## 参考资料

- [react复现vue中svg-sprite-loader的使用svg方法_桃饱の店-CSDN博客](https://blog.csdn.net/qq_21567385/article/details/108438371)
- [vue-cli创建项目后优化更多配置（三）_桃饱の店-CSDN博客](https://blog.csdn.net/qq_21567385/article/details/107673723)

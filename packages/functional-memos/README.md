# @sumyblog/rspress-functional-memos

可在 Rspress 中使用的 React 组件，基于 TanStack React Query 实现缓存与分页加载。

组件会先请求索引文件，再根据索引中的 fileName 分页请求 memo 列表文件。

## 安装

```bash
pnpm add @sumyblog/rspress-functional-memos
```

如果宿主项目尚未安装：

```bash
pnpm add @tanstack/react-query
```

## 使用

```tsx
import { FunctionalMemos } from '@sumyblog/rspress-functional-memos'

export function Demo() {
  return (
    <FunctionalMemos
      indexUrl="https://jsondata.sumygg.com/memos/index.json"
      dateFormat="YYYY-MM-DD HH:mm"
    />
  )
}
```

`indexUrl` 不传时默认使用：

`https://jsondata.sumygg.com/memos/index.json`

## 索引 JSON 结构

```json
{
  "totalMemos": 10,
  "totalFiles": 1,
  "files": [
    {
      "fileName": "mo27Fi2e2R7qhgKBJkoXkZ.json",
      "memoCount": 10
    }
  ]
}
```

## 列表 JSON 结构

```json
[
  {
    "id": "Lu6nQ6yCaJBgD7VSD6y4zU",
    "content": "...",
    "displayTime": "2026-03-16T16:45:43.000Z"
  }
]
```

## 分页加载

组件会按索引中的 files 顺序加载，每次点击按钮加载下一页（即下一个 json 文件）。

## 渲染说明

1. 列表容器渲染与单条 memo 渲染已拆分为独立组件。
2. 日期展示在每条 memo 的第一行，使用 dayjs 格式化。
3. content/snippet 使用 markdown 渲染，支持 GFM 语法。

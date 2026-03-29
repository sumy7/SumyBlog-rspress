# SumyBlog

基于 [Rspress](https://rspress.dev/) 构建的个人技术博客，采用 monorepo 架构管理博客主题与插件。

## 项目结构

```
├── blog/                          # 博客站点（Rspress）
├── packages/
│   ├── theme-default/             # 自定义博客主题
│   ├── functional-memos/          # Memos 动态组件
│   ├── plugin-post-resolver/      # 文章解析插件
│   ├── plugin-feed-rss/           # RSS 订阅生成
│   ├── plugin-reading-info/       # 阅读信息插件
│   ├── plugin-markdown-presets/   # Markdown 预设
│   ├── plugin-google-analytics/   # Google Analytics
│   ├── plugin-google-ads/         # Google Ads
│   └── plugin-deployer-git/       # Git 部署插件
```

## 开发

```bash
# 安装依赖
pnpm install

# 本地开发
pnpm dev:blog

# 构建
pnpm build:blog
```

## 文章分类

| 分类 | 说明 | 适用内容 |
|------|------|---------|
| 前端开发 | 前端技术相关 | React、Vue、CSS、JavaScript、浏览器特性、性能优化 |
| 后端开发 | 服务端技术相关 | API 设计、数据库、服务端架构 |
| 技术架构 | 系统设计与实践 | 系统设计、微服务、性能优化、最佳实践 |
| AI 探索 | 人工智能与应用 | 人工智能、机器学习、AI 应用实践 |
| DevOps | 运维与部署 | CI/CD、Docker、云服务、自动化部署 |
| 工具效率 | 效率提升 | 开发工具推荐、工作流优化、环境配置 |
| 阅读笔记 | 知识沉淀 | 技术书籍、设计著作、思想读物的阅读心得 |
| 问题排查 | 踩坑记录 | Bug 修复、疑难问题排查、踩坑经验 |
| 项目实战 | 实践导向 | 个人项目、完整方案落地、架构实现 |
| 设计随笔 | 设计思考 | UI/UX 设计、设计系统、视觉美学探索 |
| 产品思维 | 产品方法论 | 产品设计方法论、用户研究、需求分析 |
| 生活随想 | 日常感悟 | 生活感悟、旅行见闻、日常思考 |
| 职业成长 | 个人发展 | 职业发展、技能提升、个人成长思考 |

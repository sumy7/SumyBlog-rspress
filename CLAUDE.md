# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SumyBlog is a monorepo containing an Rspress-powered static blog with multiple NPM workspace packages including custom themes, plugins, and React components.

## Project Structure

- `blog/` - Rspress blog content and config (@sumyblog/rspress-blog)
  - `docs/` - Published blog content (MDX files)
  - `source/` - Source blog posts (@sumyblog/rspress-plugin-post-resolver)
  - `theme/` - Custom theme overrides
- `packages/` - NPM packages exported as workspace dependencies
  - `functional-memos/` - React memo component library with Tailwind CSS
  - `theme-default/` - Default Rspress theme with Tailwind CSS
  - `plugin-feed-rss/` - RSS feed generation plugin
  - `plugin-google-analytics/` - Google Analytics integration
  - `plugin-google-ads/` - Google AdSense widget
  - `plugin-markdown-presets/` - Custom Markdown configurations
  - `plugin-post-resolver/` - Legacy Hexo post importer for Rspress
  - `plugin-reading-info/` - Reading time and stats calculation
  - `plugin-deployer-git/` - Automated Git deployment plugin

## Technology Stack

- **Rspress** (v2.0.0) - Static site generator based on Rspack
- **Rslib** (0.19.6) - Library bundler based on Rsbuild
- **Nx** (21.6.10) - Task runner with distributed caching
- **Tailwind CSS** (v4.1.13) - Utility-first CSS
- **React** 18 - UI framework

## Common Commands

```bash
# Run blog development server
pnpm dev:blog

# Build blog for production
pnpm build:blog

# Build all packages (excludes rspress-blog)
pnpm build

# Lint code
pnpm lint

# Format code
pnpm format

# Preview built blog
pnpm preview
```

## Nx Configuration

- Cacheable operations: `dev`, `build`, `test`
- Cache directory: `.nx-cache`
- Default base for affected commands: `main` branch
- Dev/build targets depend on transitive dependencies building first

## Blog Architecture

### Post Resolution

Legacy Hexo posts in `blog/source/_posts` are resolved at build time by `@sumyblog/rspress-plugin-post-resolver` which dynamically creates routes for posts dated 2013-2017.

### Theme System

The theme combines:
- `@sumyblog/rspress-theme-default` - Custom theme providing layout components (DefaultLayout, PostLayout, HomeLayout)
- Built-in widgets: RecentPosts, FriendLinks
- Third-party integrations: Giscus comments, Busuanzi statistics

### Plugin Pipeline

Plugins are applied in this order in `rspress.config.ts`:
1. `plugin-sitemap` - Generate sitemap for SEO
2. `blogPostResolver` - Import legacy Hexo posts
3. `postReadingInfoPlugin` - Calculate reading statistics
4. `googleAnalyticsPlugin` - Track page views
5. `markdownPresetsPlugin` - Configure remark/plugins
6. `feedRssPlugin` - Generate RSS feeds

## Development Notes

- Use `package.json` scripts with `nx run` prefix for isolated execution
- NX environment variables are set to disable daemon and reject unknown cache
- Workspaces use `workspace:*` versioning for tight coupling
- Biome is the linting/formatting tool (replacing ESLint/Prettier for root)

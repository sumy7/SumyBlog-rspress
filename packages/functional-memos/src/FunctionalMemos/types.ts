import type { ReactNode } from 'react'

export type FunctionalMemoItemAttachemnt = {
  name: string
  createTime: string
  filename: string
  content: string
  externalLink: string
  type: string
  size: number
  memo: string
  _resolvedUrl?: string
}

export type FunctionalMemoItem = {
  id?: string | number
  content?: string
  snippet?: string
  displayTime?: string
  createTime?: string
  updateTime?: string
  tags?: string[]
  attachments?: FunctionalMemoItemAttachemnt[]
  [key: string]: unknown
}

export type FunctionalMemosIndexFile = {
  fileName: string
  memoCount: number
  earliestMemoId?: string
  earliestMemoTime?: string
  latestMemoId?: string
  latestMemoTime?: string
}

export type FunctionalMemosIndexResponse = {
  outputDir?: string
  exportedAt?: string
  totalMemos?: number
  totalFiles?: number
  files: FunctionalMemosIndexFile[]
}

export type FunctionalMemosProps = {
  indexUrl?: string
  className?: string
  loadingText?: string
  emptyText?: string
  errorText?: string
  loadMoreText?: string
  loadingMoreText?: string
  dateFormat?: string
  getItemKey?: (item: FunctionalMemoItem, index: number) => string | number
  renderItem?: (item: FunctionalMemoItem, index: number) => ReactNode
}

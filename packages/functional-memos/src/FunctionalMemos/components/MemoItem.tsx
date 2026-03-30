import dayjs from 'dayjs'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Badge } from '@/components/ui/badge'
import type { FunctionalMemoItem } from '../types'
import { useState, useRef } from 'react'

type MemoItemProps = {
  item: FunctionalMemoItem
  dateFormat: string
}

export function MemoItemSkeleton() {
  return (
    <div className="border-b border-border py-5">
      <div className="flex flex-col gap-3">
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-12 animate-pulse rounded bg-muted" />
          <div className="h-5 w-14 animate-pulse rounded bg-muted" />
          <div className="h-5 w-10 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}

function resolveDisplayTime(item: FunctionalMemoItem): string {
  return item.displayTime ?? item.createTime ?? item.updateTime ?? ''
}

export function MemoItem({ item, dateFormat }: MemoItemProps) {
  const displayTime = resolveDisplayTime(item)
  const timeText = displayTime
    ? dayjs(displayTime).format(dateFormat)
    : 'Unknown date'
  const content = item.content ?? item.snippet ?? ''
  const tags = Array.isArray(item.tags) ? item.tags : []

  // 过滤图片附件
  const imageAttachments = Array.isArray(item.attachments)
    ? item.attachments.filter(
        (att) => att.type && att.type.startsWith('image/')
      )
    : []

  // 图片预览弹窗
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  // 处理引用 memos展示规则
  const currentMemoName = item.name
  const showReferenced = Array.isArray(item.relations)
    ? item.relations
        .filter(
          (rel) =>
            rel.type === 'REFERENCE' &&
            rel.memo &&
            rel.relatedMemo &&
            rel.memo.name === currentMemoName
        )
        .map((rel) => rel.relatedMemo)
    : []
  const showRefBy = Array.isArray(item.relations)
    ? item.relations
        .filter(
          (rel) =>
            rel.type === 'REFERENCE' &&
            rel.memo &&
            rel.relatedMemo &&
            rel.relatedMemo.name === currentMemoName
        )
        .map((rel) => rel.memo)
    : []

  const memoRef = useRef<HTMLDivElement>(null)

  // 滚动到指定 memo
  function scrollToMemo(memoName: string) {
    const el = document.getElementById(`memo-${memoName}`)
    if (el) {
      el.classList.add('memo-flash-bg')
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        el.classList.remove('memo-flash-bg')
      }, 800)
      setTimeout(() => {
        el.classList.add('memo-flash-bg')
      }, 900)
      setTimeout(() => {
        el.classList.remove('memo-flash-bg')
      }, 1700)
    }
  }

  return (
    <article
      id={`memo-${item.name}`}
      ref={memoRef}
      className="group border-b border-border py-5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-3"
    >
      <div className="flex flex-col gap-3">
        <time className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {timeText}
        </time>

        {/* 引用 */}
        {showReferenced.length > 0 && (
          <div className="mb-2 flex flex-col gap-1">
            {showReferenced.map((memo, idx) => (
              <div
                key={memo.name + idx}
                className="rounded bg-muted/60 border border-border px-3 py-2 text-xs text-muted-foreground cursor-pointer hover:bg-primary/10"
                title={memo.name}
                style={{ wordBreak: 'break-all' }}
                onClick={() => scrollToMemo(memo.name)}
              >
                <span className="opacity-70 mr-2">引用：</span>
                {memo.snippet}
              </div>
            ))}
          </div>
        )}

        <div className="text-sm leading-7 text-foreground max-sm:text-[13px] max-sm:leading-[1.65] [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded-md [&_code]:border [&_code]:border-border [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-px [&_code]:text-xs [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_pre]:my-2.5 [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted [&_pre]:p-3 [&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0">
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>

        {/* 被引用 */}
        {showRefBy.length > 0 && (
          <div className="mt-2 flex flex-col gap-1">
            {showRefBy.map((memo, idx) => (
              <div
                key={memo.name + idx}
                className="rounded bg-muted/60 border border-border px-3 py-2 text-xs text-muted-foreground cursor-pointer hover:bg-primary/10"
                title={memo.name}
                style={{ wordBreak: 'break-all' }}
                onClick={() => scrollToMemo(memo.name)}
              >
                <span className="opacity-70 mr-2">被引用：</span>
                {memo.snippet}
              </div>
            ))}
          </div>
        )}

        {/* 图片附件缩略图展示 */}
        {imageAttachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {imageAttachments.map((att, idx) => (
              <img
                key={att.name + att.filename + idx}
                src={att._resolvedUrl}
                alt={att.filename || 'attachment'}
                className="w-20 h-20 object-cover rounded cursor-pointer border border-border hover:scale-105 transition-transform duration-200"
                onClick={() => setPreviewImg(att._resolvedUrl)}
                loading="lazy"
              />
            ))}
          </div>
        )}

        {tags.length > 0 ? (
          <ul
            className="m-0 flex list-none flex-wrap gap-2 p-0 [&>li]:list-none"
            aria-label="memo tags"
          >
            {tags.map((tag, index) => (
              <li key={`${tag}-${index}`}>
                <Badge
                  variant="secondary"
                  className="text-primary/90 hover:text-primary"
                >
                  #{tag}
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}
        {/* 图片预览弹窗 */}
        {previewImg && (
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setPreviewImg(null)}
          >
            <img
              src={previewImg}
              alt="preview"
              className="max-w-[90vw] max-h-[90vh] rounded shadow-lg border border-border bg-white"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-8 text-white text-3xl font-bold bg-black/40 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
              onClick={() => setPreviewImg(null)}
              aria-label="关闭图片预览"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

// 追加全局样式
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const styleId = 'memo-flash-bg-style'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.innerHTML = `
      .memo-flash-bg {
        background-color: rgba(59,130,246,0.18) !important;
        transition: background-color 0.25s;
      }
    `
    document.head.appendChild(style)
  }
}

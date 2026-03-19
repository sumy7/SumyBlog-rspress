import dayjs from 'dayjs'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Badge } from '@/components/ui/badge'
import type { FunctionalMemoItem } from '../types'

type MemoItemProps = {
  item: FunctionalMemoItem
  dateFormat: string
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

  return (
    <article className="group border-b border-border py-5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-3">
      <div className="flex flex-col gap-3">
        <time className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {timeText}
        </time>

        <div className="text-sm leading-7 text-foreground max-sm:text-[13px] max-sm:leading-[1.65] [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded-md [&_code]:border [&_code]:border-border [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-px [&_code]:text-xs [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_pre]:my-2.5 [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted [&_pre]:p-3 [&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0">
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>

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
      </div>
    </article>
  )
}

import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import type { FunctionalMemoItem } from '../types'
import { MemoItemSkeleton } from './MemoItem'

type MemoListProps = {
  items: FunctionalMemoItem[]
  className?: string
  hasNextPage: boolean
  isFetchingNextPage: boolean
  loadMoreText: string
  loadingMoreText: string
  onLoadMore: () => void
  getItemKey?: (item: FunctionalMemoItem, index: number) => string | number
  renderItem: (item: FunctionalMemoItem, index: number) => ReactNode
}

export function MemoListSkeleton({ className }: { className?: string }) {
  return (
    <section
      className={['mx-auto max-w-4xl px-6 py-12', className]
        .filter(Boolean)
        .join(' ')}
    >
      <h2 className="mb-3 text-sm font-semibold">Memos</h2>
      <div className="m-0 list-none p-0">
        {Array.from({ length: 3 }, (_, i) => (
          <MemoItemSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

export function MemoList(props: MemoListProps) {
  const {
    items,
    className,
    hasNextPage,
    isFetchingNextPage,
    loadMoreText,
    loadingMoreText,
    onLoadMore,
    getItemKey,
    renderItem,
  } = props

  return (
    <section
      className={['mx-auto max-w-4xl px-6 py-12', className]
        .filter(Boolean)
        .join(' ')}
    >
      <h2 className="mb-3 text-sm font-semibold">Memos</h2>

      <ul className="m-0 list-none p-0">
        {items.map((item, index) => {
          const key = getItemKey?.(item, index) ?? item.id ?? index
          return (
            <li
              className={index === 0 ? 'relative' : 'relative mt-3 max-sm:mt-2'}
              key={key}
            >
              {renderItem(item, index)}
            </li>
          )
        })}
      </ul>

      {hasNextPage ? (
        <div className="mt-4 flex justify-center pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? loadingMoreText : loadMoreText}
          </Button>
        </div>
      ) : null}
    </section>
  )
}

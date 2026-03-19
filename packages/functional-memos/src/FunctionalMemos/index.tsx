import { useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import './styles.css'
import { MemoItem } from './components/MemoItem'
import { MemoList } from './components/MemoList'
import type {
  FunctionalMemoItem,
  FunctionalMemosIndexResponse,
  FunctionalMemosProps,
} from './types'

const DEFAULT_INDEX_URL = 'https://jsondata.sumygg.com/memos/index.json'

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    signal,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

function resolveMemoListUrl(indexUrl: string, fileName: string): string {
  return new URL(fileName, indexUrl).toString()
}

function FunctionalMemosInner(props: FunctionalMemosProps) {
  const {
    indexUrl = DEFAULT_INDEX_URL,
    className,
    loadingText = 'Loading...',
    emptyText = 'No memos yet.',
    errorText = 'Failed to load memos.',
    loadMoreText = 'Load more',
    loadingMoreText = 'Loading more...',
    dateFormat = 'YYYY-MM-DD HH:mm',
    getItemKey,
    renderItem,
  } = props

  const indexQuery = useQuery({
    queryKey: ['functional-memos', 'index', indexUrl],
    queryFn: ({ signal }) =>
      fetchJson<FunctionalMemosIndexResponse>(indexUrl, signal),
  })

  const memoFiles = indexQuery.data?.files ?? []

  const memosQuery = useInfiniteQuery({
    queryKey: [
      'functional-memos',
      'pages',
      indexUrl,
      memoFiles.map((item) => item.fileName).join('|'),
    ],
    initialPageParam: 0,
    enabled: memoFiles.length > 0,
    queryFn: async ({ pageParam, signal }) => {
      const pageIndex = Number(pageParam)
      const file = memoFiles[pageIndex]
      if (!file) {
        return [] as FunctionalMemoItem[]
      }

      const memoUrl = resolveMemoListUrl(indexUrl, file.fileName)
      return fetchJson<FunctionalMemoItem[]>(memoUrl, signal)
    },
    getNextPageParam: (_lastPage, allPages) => {
      const nextIndex = allPages.length
      return nextIndex < memoFiles.length ? nextIndex : undefined
    },
  })

  const items = memosQuery.data?.pages.flat() ?? []

  if (indexQuery.isPending || memosQuery.isPending) {
    return <p className={className}>{loadingText}</p>
  }

  if (indexQuery.isError || memosQuery.isError) {
    return <p className={className}>{errorText}</p>
  }

  if (items.length === 0) {
    return <p className={className}>{emptyText}</p>
  }

  return (
    <MemoList
      items={items}
      className={className}
      hasNextPage={Boolean(memosQuery.hasNextPage)}
      isFetchingNextPage={memosQuery.isFetchingNextPage}
      loadMoreText={loadMoreText}
      loadingMoreText={loadingMoreText}
      onLoadMore={() => {
        void memosQuery.fetchNextPage()
      }}
      getItemKey={getItemKey}
      renderItem={(item, index) =>
        renderItem ? (
          renderItem(item, index)
        ) : (
          <MemoItem item={item} dateFormat={dateFormat} />
        )
      }
    />
  )
}

export function FunctionalMemos(props: FunctionalMemosProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <FunctionalMemosInner {...props} />
    </QueryClientProvider>
  )
}

export default FunctionalMemos

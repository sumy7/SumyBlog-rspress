import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
  currentPage: number
  totalPage: number
  onChange: (page: number) => void
  className?: string
}

const neighboursNumber = 1

function getPaginationItems(currentPage: number, totalPage: number) {
  const items: Array<{ page: number | '...'; disabled: boolean }> = []

  items.push({ page: 1, disabled: false })

  if (currentPage - neighboursNumber > 2) {
    items.push({ page: '...', disabled: true })
    for (let i = currentPage - neighboursNumber; i < currentPage; i++) {
      items.push({ page: i, disabled: false })
    }
  } else {
    for (let i = 2; i < currentPage; i++) {
      items.push({ page: i, disabled: false })
    }
  }

  for (
    let i = Math.max(2, currentPage);
    i < Math.min(currentPage + neighboursNumber + 1, totalPage);
    i++
  ) {
    items.push({ page: i, disabled: false })
  }

  if (currentPage + neighboursNumber < totalPage - 1) {
    items.push({ page: '...', disabled: true })
  }

  if (totalPage > 1) {
    items.push({ page: totalPage, disabled: false })
  }

  return items
}

export function Pagination({
  currentPage,
  totalPage,
  onChange,
  className,
}: PaginationProps) {
  const paginationItems = React.useMemo(
    () => getPaginationItems(currentPage, totalPage),
    [currentPage, totalPage]
  )

  if (totalPage <= 1) {
    return null
  }

  return (
    <PaginationRoot
      className={cn(
        'mt-5 flex items-center justify-center gap-1 py-2',
        className
      )}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text="上一页"
            className={
              currentPage === 1 ? 'pointer-events-none opacity-40' : ''
            }
            onClick={(event) => {
              event.preventDefault()
              if (currentPage > 1) {
                onChange(currentPage - 1)
              }
            }}
          />
        </PaginationItem>

        {paginationItems.map((item, index) => {
          if (item.disabled) {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          const isActive = currentPage === item.page

          return (
            <PaginationItem key={`page-${item.page}`}>
              <PaginationLink
                href="#"
                isActive={isActive}
                size="sm"
                onClick={(event) => {
                  event.preventDefault()
                  onChange(item.page as number)
                }}
              >
                {item.page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            text="下一页"
            className={
              currentPage === totalPage ? 'pointer-events-none opacity-40' : ''
            }
            onClick={(event) => {
              event.preventDefault()
              if (currentPage < totalPage) {
                onChange(currentPage + 1)
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  )
}

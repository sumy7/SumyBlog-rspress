import { useMemo } from 'react'
import classnames from 'classnames'

import styles from './index.module.scss'

interface PaginationProps {
  currentPage: number
  totalPage: number
  onChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPage, onChange }: PaginationProps) => {
  const neighboursNumber = 1

  const paginationItems = useMemo(() => {
    const items = []

    items.push({
      page: 1,
      disabled: false,
    })

    if (currentPage - neighboursNumber > 2) {
      items.push({
        page: '...',
        disabled: true,
      })
      for (let i = currentPage - neighboursNumber; i < currentPage; i++) {
        items.push({
          page: i,
          disabled: false,
        })
      }
    } else {
      for (let i = 2; i < currentPage; i++) {
        items.push({
          page: i,
          disabled: false,
        })
      }
    }

    for (
      let i = Math.max(2, currentPage);
      i < Math.min(currentPage + neighboursNumber + 1, totalPage);
      i++
    ) {
      items.push({
        page: i,
        disabled: false,
      })
    }
    if (currentPage + neighboursNumber < totalPage - 1) {
      items.push({
        page: '...',
        disabled: true,
      })
    }
    if (totalPage > 1) {
      items.push({
        page: totalPage,
        disabled: false,
      })
    }

    return items
  }, [currentPage, totalPage])

  return (
    <div className="flex justify-center items-center">
      <span
        className={classnames(styles.paginationItem, {
          [styles.disabled]: currentPage === 1,
        })}
        onClick={() => {
          if (currentPage !== 1) {
            onChange(currentPage - 1)
          }
        }}
      >
        上一页
      </span>
      {paginationItems.map((item, index) => (
        <span
          key={index}
          className={classnames(
            styles.paginationItem,
            {
              [styles.active]: currentPage === item.page,
            },
            {
              [styles.disabled]: item.disabled,
            }
          )}
          onClick={() => {
            if (!item.disabled) {
              onChange(item.page as number)
            }
          }}
        >
          {item.page}
        </span>
      ))}
      <span
        className={classnames(styles.paginationItem, {
          [styles.disabled]: currentPage === totalPage,
        })}
        onClick={() => {
          if (currentPage !== totalPage) {
            onChange(currentPage + 1)
          }
        }}
      >
        下一页
      </span>
    </div>
  )
}

export default Pagination

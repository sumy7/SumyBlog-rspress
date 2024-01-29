import React, { useMemo } from 'react'
import PostList from '@theme/components/PostList'
import styles from './index.module.scss'
import { usePageData, useSearchParams } from 'rspress/runtime'
import { PostInfo } from '@plugins/PostData'
import Pagination from '@theme/components/Pagination'

const HomeLayout = () => {
  const { page } = usePageData()
  const posts = (page.posts || []) as PostInfo[]

  const [searchParams, setSearchParams] = useSearchParams()

  // 计算总页数
  const pageSize = 10
  const totalPage = Math.ceil(posts.length / pageSize)
  const currentPage = useMemo(() => {
    let page = Number(searchParams.get('page')) || 1
    if (page < 1) {
      page = 1
    }
    if (page > totalPage) {
      page = totalPage
    }
    return page
  }, [searchParams])
  // 截取当前页的数据
  const currentPageData = useMemo(() => {
    return posts.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  }, [currentPage])

  return (
    <div className={`${styles.homeLayout} container mx-auto sm:px-16 px-5`}>
      <PostList posts={currentPageData} />
      <div className="mt-5"></div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChange={(number) => setSearchParams({ page: number + '' })}
      />
    </div>
  )
}

export default HomeLayout

import { useMemo } from 'react'
import { usePageData, useSearchParams } from '@rspress/runtime'
import { PostInfo } from '@sumyblog/rspress-plugin-post-resolver'
import { Nav } from '@rspress/theme-default'
import styles from './index.module.scss'
import Pagination from '@/components/Pagination'
import PostList from '@/components/PostList'

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
    <div>
      <Nav />
      <div className={`${styles.homeLayout} container mx-auto sm:px-16 px-5`}>
        <PostList posts={currentPageData} />
        <div className="mt-5"></div>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={(number) => setSearchParams({ page: `${number}` })}
        />
      </div>
    </div>
  )
}

export default HomeLayout

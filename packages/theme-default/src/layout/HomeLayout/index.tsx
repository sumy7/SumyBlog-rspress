import { useMemo } from 'react'
import { useSearchParams } from '@rspress/runtime'
import { postInfos } from 'virtual-post-data'
import classnames from 'classnames'
import Pagination from '@/components/Pagination'
import PostList from '@/components/PostList'
import BaseLayout from '@/layout/BaseLayout'
import RecentPostsWidget from '@/widget/RecentPosts'
import TagCloudWidget from '@/widget/TagCloud'
import CategoriesWidget from '@/widget/Categories'
import FriendLinkWidget from '@/widget/FriendLink'
import GoogleAdWidget from '@/widget/GoogleAd'

const HomeLayout = () => {
  const posts = postInfos || []

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
    <BaseLayout
      outline={
        <div className={classnames('flex', 'flex-col', 'gap-3')}>
          <CategoriesWidget />
          <RecentPostsWidget />
          <TagCloudWidget />
          <FriendLinkWidget />
          <GoogleAdWidget />
        </div>
      }
    >
      <PostList posts={currentPageData} />
      <div className="mt-5"></div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChange={(number) => setSearchParams({ page: `${number}` })}
      />
    </BaseLayout>
  )
}

export default HomeLayout

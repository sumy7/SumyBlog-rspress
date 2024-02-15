import { Layout } from '@rspress/theme-default'
import HomeLayout from './HomeLayout'
import PostLayout from './PostLayout'
import DefaultLayout from '@/layout/DefaultLayout'
import ArchivesLayout from '@/layout/ArchivesLayout'
import CategoriesLayout from '@/layout/CategoriesLayout'
import TagsLayout from '@/layout/TagsLayout'

/**
 * 获取页面布局
 * @param pageType rspress原有的页面类型
 * @param postType md中定义的页面类型
 */
export const getLayout = (pageType: string, postType: string) => {
  if (pageType === '404' || pageType === 'custom' || pageType === 'blank') {
    return <Layout />
  } else if (postType === 'home') {
    return <HomeLayout />
  } else if (postType === 'archives') {
    return <ArchivesLayout />
  } else if (postType === 'categories') {
    return <CategoriesLayout />
  } else if (postType === 'tags') {
    return <TagsLayout />
  } else if (postType === 'post') {
    return <PostLayout />
  } else {
    return <DefaultLayout />
  }
}

import { Layout } from '@rspress/theme-default'
import PostFooter from '@/components/PostFooter'
import PostInfo from '@/components/PostInfo'

const PostLayout = () => {
  return (
    <Layout beforeDocFooter={<PostFooter />} beforeOutline={<PostInfo />} />
  )
}
export default PostLayout

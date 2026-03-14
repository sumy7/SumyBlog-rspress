import { Layout } from '@rspress/core/theme-original'
import PostFooter from '@/components/PostFooter'
import Footer from '@/components/Footer'

const PostLayout = () => {
  return (
    <Layout
      beforeDocFooter={<PostFooter />}
      beforeOutline={<div></div>}
      bottom={<Footer />}
    />
  )
}
export default PostLayout

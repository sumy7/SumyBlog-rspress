import { Layout } from '@rspress/theme-default'
import PostFooter from '@/components/PostFooter'
import PostInfo from '@/components/PostInfo'
import Footer from '@/components/Footer'

const PostLayout = () => {
  return (
    <Layout
      beforeDocFooter={<PostFooter />}
      beforeOutline={<PostInfo />}
      bottom={<Footer />}
    />
  )
}
export default PostLayout

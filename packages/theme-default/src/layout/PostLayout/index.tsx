import { Layout } from '@rspress/theme-default'
import PostFooter from '@/components/PostFooter'
import Footer from '@/components/Footer'

const PostLayout = () => {
  return (
    <Layout
      beforeDocFooter={<PostFooter />}
      beforeOutline={<div>{/*todo ad*/}</div>}
      bottom={<Footer />}
    />
  )
}
export default PostLayout

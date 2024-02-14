import { Layout } from '@rspress/theme-default'
import PostFooter from '@/components/PostFooter'

const DefaultLayout = () => {
  return <Layout beforeDocFooter={<PostFooter />} />
}
export default DefaultLayout

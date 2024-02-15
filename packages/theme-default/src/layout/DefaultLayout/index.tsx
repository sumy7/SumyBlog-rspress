import { Layout } from '@rspress/theme-default'
import PostFooter from '@/components/PostFooter'
import Footer from '@/components/Footer'

const DefaultLayout = () => {
  return <Layout beforeDocFooter={<PostFooter />} bottom={<Footer />} />
}
export default DefaultLayout

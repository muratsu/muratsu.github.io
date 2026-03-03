import { getPosts } from '../../lib/posts'
import { PostFeed } from '../../components/post-feed'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Posts',
  description: 'The full archive of Occupy Matrix posts.'
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <>
      <PostFeed
        description="Writing about software craft, AI-native tools, and the practical work of turning rough ideas into products."
        posts={posts}
        title="Articles"
      />
    </>
  )
}

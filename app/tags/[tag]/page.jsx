import { notFound } from 'next/navigation'

import { PostFeed } from '../../../components/post-feed'
import { getPostsByTag, getTags } from '../../../lib/posts'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const tags = await getTags()
  return tags.map(tag => ({ tag }))
}

export async function generateMetadata(props) {
  const params = await props.params
  const tag = decodeURIComponent(params.tag)

  return {
    title: `#${tag}`,
    description: `Posts tagged ${tag}.`
  }
}

export default async function TagPage(props) {
  const params = await props.params
  const tag = decodeURIComponent(params.tag)
  const posts = await getPostsByTag(tag)

  if (!posts.length) {
    notFound()
  }

  return (
    <PostFeed
      description={`Posts filed under ${tag}.`}
      posts={posts}
      title={`#${tag}`}
    />
  )
}

import { generateStaticParamsFor, importPage } from 'nextra/pages'

import { PostFeed } from '../../components/post-feed'
import { getPosts } from '../../lib/posts'
import { siteDescription, siteTitle } from '../../lib/site'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

export const dynamic = 'force-static'
export const dynamicParams = false
export const generateStaticParams = generateStaticParamsFor('mdxPath')

const Wrapper = getMDXComponents().wrapper

export async function generateMetadata(props) {
  const params = await props.params

  if (!params.mdxPath?.length) {
    return {
      title: {
        absolute: siteTitle
      },
      description: siteDescription
    }
  }

  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

export default async function Page(props) {
  const params = await props.params

  if (!params.mdxPath?.length) {
    const posts = await getPosts()

    return <PostFeed posts={posts} />
  }

  const result = await importPage(params.mdxPath)
  const { default: MDXContent, metadata, toc } = result

  return (
    <Wrapper metadata={metadata} toc={toc}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}

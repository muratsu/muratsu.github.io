import Link from 'next/link'

import { getTagCounts } from '../../lib/posts'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Tags',
  description: 'Browse Occupy Matrix posts by topic.'
}

export default async function TagsPage() {
  const tags = await getTagCounts()

  return (
    <>
      <h1>Tags</h1>
      <p className="page-lead">
        A lightweight index for the recurring themes across the blog.
      </p>

      {tags.length ? (
        <div className="tag-grid">
          {tags.map(({ tag, count }) => (
            <Link key={tag} className="tag-chip" href={`/tags/${tag}/`}>
              <span>#{tag}</span>
              <strong>{count}</strong>
            </Link>
          ))}
        </div>
      ) : (
        <p className="empty-state">No tags yet.</p>
      )}
    </>
  )
}

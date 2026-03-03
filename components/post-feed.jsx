import Link from 'next/link'

function formatPostDate(date) {
  if (!date) {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}

export function PostFeed({ posts, title, description }) {
  return (
    <section className="feed">
      {title ? <h1 className="feed-title">{title}</h1> : null}
      {description ? <p className="feed-description">{description}</p> : null}

      {posts.length ? (
        <div className="feed-list">
          {posts.map(post => (
            <article className="feed-item" key={post.route}>
              <time className="feed-item-date" dateTime={post.frontMatter?.date}>
                {formatPostDate(post.frontMatter?.date)}
              </time>

              <div className="feed-item-marker" aria-hidden="true">
                {post.frontMatter?.featured ? '★' : ''}
              </div>

              <h2 className="feed-item-title">
                <Link href={`${post.route}/`}>{post.frontMatter?.title}</Link>
              </h2>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-state">No posts yet.</p>
      )}
    </section>
  )
}

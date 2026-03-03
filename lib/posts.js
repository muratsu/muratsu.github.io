import { getPageMap } from 'nextra/page-map'

function flattenPageMap(items, pages = []) {
  for (const item of items) {
    if (!item) {
      continue
    }

    if ('children' in item) {
      flattenPageMap(item.children, pages)
      continue
    }

    if ('route' in item && 'name' in item) {
      pages.push(item)
    }
  }

  return pages
}

function byPublishedDateDesc(a, b) {
  return new Date(b.frontMatter?.date ?? 0) - new Date(a.frontMatter?.date ?? 0)
}

export async function getPosts() {
  const pageMap = await getPageMap('/posts')
  return flattenPageMap(pageMap)
    .filter(page => page.route.startsWith('/posts/'))
    .sort(byPublishedDateDesc)
}

export async function getTags() {
  const posts = await getPosts()
  return [...new Set(posts.flatMap(post => post.frontMatter?.tags ?? []))].sort()
}

export async function getTagCounts() {
  const posts = await getPosts()
  const counts = new Map()

  for (const post of posts) {
    for (const tag of post.frontMatter?.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag))
}

export async function getPostsByTag(tag) {
  const posts = await getPosts()
  return posts.filter(post => (post.frontMatter?.tags ?? []).includes(tag))
}

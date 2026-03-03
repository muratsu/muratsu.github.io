import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/',
  readingTime: true,
  search: false
})

export default withNextra({
  images: {
    unoptimized: true
  },
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true
})

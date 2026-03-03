import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <h1>Not found</h1>
      <p className="page-lead">
        That page does not exist in this version of the blog.
      </p>
      <p>
        Head back to <Link href="/">the homepage</Link> or browse the{' '}
        <Link href="/posts/">posts archive</Link>.
      </p>
    </>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/', label: 'Articles' },
  { href: '/about/', label: 'About me' }
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="sidebar-nav" data-pagefind-ignore="all">
      {items.map(item => {
        const isActive =
          item.href === '/'
            ? pathname === '/' || pathname.startsWith('/posts')
            : pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

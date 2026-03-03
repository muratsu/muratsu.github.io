import './global.css'
import 'nextra-theme-blog/style.css'

import Link from 'next/link'
import Image from 'next/image'
import { Manrope } from 'next/font/google'
import { Layout } from 'nextra-theme-blog'
import { siX } from 'simple-icons'

import { SidebarNav } from '../components/sidebar-nav'

import {
  siteAuthor,
  siteDescription,
  siteIntro,
  siteTitle,
  siteUrl,
  socialLinks
} from '../lib/site'

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`
  },
  description: siteDescription,
  openGraph: {
    description: siteDescription,
    siteName: siteTitle,
    title: siteTitle,
    type: 'website',
    url: siteUrl
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@muratsutunc',
    description: siteDescription,
    title: siteTitle
  }
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={sans.variable}>
      <body>
        <div className="site-shell">
          <div className="site-grid">
            <aside className="site-sidebar">
              <Link className="site-avatar-link" href="/">
                <Image
                  alt={`${siteTitle} avatar`}
                  className="site-avatar"
                  height={88}
                  priority
                  src="/murat.jpg"
                  width={88}
                />
              </Link>

              <Link className="site-brand" href="/">
                <span className="site-brand-title">{siteTitle}</span>
              </Link>

              <p className="site-intro">{siteIntro}</p>

              <SidebarNav />

              <div className="site-socials" data-pagefind-ignore="all">
                <a
                  aria-label="Twitter"
                  href={socialLinks.twitter}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={siX.path} fill="currentColor" />
                  </svg>
                </a>
                <a
                  aria-label="GitHub"
                  href={socialLinks.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.32 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.93.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.9c.85 0 1.71.12 2.51.36 1.9-1.33 2.74-1.05 2.74-1.05.56 1.43.21 2.48.11 2.74.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a aria-label="Email" href={socialLinks.email}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M3 5.5h18a1 1 0 0 1 1 1v11a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 17.5v-11a1 1 0 0 1 1-1Zm9 7.03L20.25 7H3.75L12 12.53Zm-8 4.97h16V8.34l-7.43 4.97a1 1 0 0 1-1.14 0L4 8.34v9.16Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>

              <p className="site-footnote">
                © {new Date().getFullYear()} {siteAuthor}.
              </p>
            </aside>

            <main className="site-main">
              <Layout nextThemes={{ defaultTheme: 'light', forcedTheme: 'light' }}>
                {children}
              </Layout>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

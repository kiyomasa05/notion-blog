import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'notion-blog',
  description: 'notionと連携しているブログです',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}

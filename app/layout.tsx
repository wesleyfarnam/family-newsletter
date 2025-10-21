import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Family Newsletter',
  description: 'Stay connected with your family through personalized newsletters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
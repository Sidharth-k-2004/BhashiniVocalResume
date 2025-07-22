import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vocal Resume',
  description: 'Created for BSV 2.0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

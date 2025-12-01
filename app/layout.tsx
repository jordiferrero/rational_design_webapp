import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/Analytics'
import { PostHog } from '@/components/PostHog'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rational Design of Oleophobic Textiles',
  description: 'Interactive webapp for designing PFC-free oil-repellent textile finishes',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <PostHog />
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}

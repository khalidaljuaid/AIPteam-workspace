import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AIP Team - Professional Workspace',
  description: 'Digital Solutions & Team Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

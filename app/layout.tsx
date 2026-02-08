import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RIM | The RIM Blockchain Explorer',
  description: 'RIM is the leading blockchain explorer, search, API and analytics platform for RIM blockchain',
  keywords: 'RIM, blockchain, explorer, transactions, blocks, smart contracts, tokens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white min-h-screen`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}


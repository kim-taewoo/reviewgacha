import './globals.css'
import { DEFAULT_URL } from '@/constatns'

import { pretendard } from './fonts'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: 'REVIEW GACHA',
  description: '리뷰가챠로 리뷰를 더 즐겁게!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <main className="flex min-h-dvh flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}

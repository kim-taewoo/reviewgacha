import { Footer } from '@/components/Footer'
import { DEFAULT_URL } from '@/constatns'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: 'REVIEW GACHA',
  description: '리뷰가챠로 리뷰를 더 즐겁게!',
}

export default function RankingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex size-full h-full max-w-5xl flex-1 flex-col items-center gap-20 p-5">
      {children}
      <Footer />
    </div>
  )
}

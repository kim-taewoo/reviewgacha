import Link from 'next/link'
import { Suspense } from 'react'

import { LoadingCircle } from '@/components/LoadingCircle'

import { GachaTicketsCounter } from './GachaTicketsCounter'

export function Header({ postId }: { postId: string }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="flex items-center justify-between border-b p-4">
        <Link href="/" className="bg-gradient-to-r from-[#FF9E49] to-[#FFD849] bg-clip-text text-xl font-bold text-transparent">
          리뷰가챠!
        </Link>
        <Suspense fallback={<LoadingCircle />}>
          <GachaTicketsCounter postId={postId} />
        </Suspense>
      </div>
    </header>
  )
}

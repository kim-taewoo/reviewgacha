'use client'

import { Ticket } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

export function Header({ ticketCount = 0, postId }: { postId: string, ticketCount?: number }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (ticketCount > 0) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 2500) // Animation duration
      return () => clearTimeout(timer)
    }
  }, [ticketCount])

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="flex items-center justify-between border-b p-4">
        <Link href="/" className="bg-gradient-to-r from-[#FF9E49] to-[#FFD849] bg-clip-text text-xl font-bold text-transparent">
          리뷰가챠!
        </Link>
        <Link href={`/gachas/${postId}/gacha`}>
          <div className="flex items-center gap-2">
            <Ticket className="size-5 -rotate-45 text-gray-600" />
            <span className={cn('text-sm text-gray-600', animate ? 'animate-bounce' : '')}>
              내 가챠권
              <span className="ml-1 font-bold text-[#FF9E49]">
                +
                {ticketCount}
              </span>

            </span>
          </div>
        </Link>
      </div>
    </header>
  )
}

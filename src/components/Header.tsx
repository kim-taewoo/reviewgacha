import { Ticket } from 'lucide-react'
import Link from 'next/link'

export function Header({ ticketCount = 0 }: { ticketCount?: number }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="flex items-center justify-between border-b p-4">
        <Link href="/" className="bg-gradient-to-r from-[#FF9E49] to-[#FFD849] bg-clip-text text-xl font-bold text-transparent">
          리뷰가챠!
        </Link>
        <div className="flex items-center gap-2">
          <Ticket className="size-5 text-gray-600" />
          <span className="text-sm text-gray-600">
            내 가챠권
            <span className="ml-1 text-[#FF9E49]">
              +
              {ticketCount}
            </span>

          </span>
        </div>
      </div>
    </header>
  )
}

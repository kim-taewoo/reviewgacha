"use client"

import { Ticket } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

export function GachaTicketsCounter() {
  const params = useParams()
  const postId = params.id
  const supabase = getSupabaseBrowserClient()

  const [ticketCount, setTicketCount] = useState(0)

  useEffect(() => {
    async function fetchGachas() {
      const { data: notUsedGachas } = await supabase.from("gachas").select().match({
        post_id: postId,
        is_used: false,
      })

      const ticketCount = notUsedGachas?.length ?? 0
      setTicketCount(ticketCount)
      return ticketCount
    }

    fetchGachas()
  }, [postId, supabase])

  return (
    <Link href={`/gachas/${postId}/gacha`}>
      <div className="flex items-center gap-2">
        <Ticket className="size-5 -rotate-45 text-gray-600" />
        <span className={cn("text-sm text-gray-600", ticketCount > 0 && "animate-pulse")}>
          내 가챠권
          <span className="ml-1 font-bold text-[#FF9E49]">
            +
            {ticketCount}
          </span>

        </span>
      </div>
    </Link>
  )
}

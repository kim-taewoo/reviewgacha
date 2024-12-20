import { Ticket } from "lucide-react"
import Link from "next/link"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"

export async function GachaTicketsCounter({ postId }: { postId: string }) {
  const supabase = await getSupabaseServerClient()

  const { data: notUsedGachas } = await supabase.from("gachas").select().match({
    post_id: postId,
    is_used: false,
  })

  const ticketCount = notUsedGachas?.length ?? 0

  // useEffect(() => {
  //   if (ticketCount > 0) {
  //     setAnimate(true)
  //     const timer = setTimeout(() => setAnimate(false), 2500) // Animation duration
  //     return () => clearTimeout(timer)
  //   }
  // }, [ticketCount])

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

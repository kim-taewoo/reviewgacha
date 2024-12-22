import { getSupabaseBrowserClient } from "@/lib/supabase/client"

import { Review } from "../types"

import { ReviewCard } from "./ReviewCard"

export async function ReviewsGrid({ pageParams }: { pageParams: Promise<{ id: string }> }) {
  const supabase = getSupabaseBrowserClient()
  const postId = (await pageParams).id

  const { data: reviewsData } = await supabase.from("reviews").select().match({ post_id: postId }).order("created_at", { ascending: false })

  const reviews = reviewsData ?? [] as Review[]

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(reviews as Review[]).map(review => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  )
}

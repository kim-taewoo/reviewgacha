import { getSupabaseServerClient } from '@/lib/supabase/server'

import { Review } from '../types'

import { ResponsiveReviewCards } from './ResponsiveReviewCards'

export async function ReviewsGrid({ postId }: { postId: string }) {
  const supabase = await getSupabaseServerClient()
  const { data: reviewsData } = await supabase.from('reviews').select().match({ post_id: postId }).order('created_at', { ascending: false })

  const reviews = reviewsData ?? [] as Review[]

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ResponsiveReviewCards reviews={reviews as Review[]} />
      </div>
    </div>
  )
}

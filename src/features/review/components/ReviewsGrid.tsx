import { getSupabaseServerClient } from '@/lib/supabase/server'

import { Review } from '../types'

import { ResponsiveReviewCards } from './ResponsiveReviewCards'
import { ReviewCard } from './ReviewCard'

export async function ReviewsGrid() {
  const supabase = await getSupabaseServerClient()
  const { data: reviewsData, error } = await supabase.from('reviews').select().match({ post_id: '1' }).order('created_at', { ascending: true })

  const reviews = reviewsData ?? [] as Review[]

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ResponsiveReviewCards reviews={reviews} />
      </div>
    </div>
  )
}

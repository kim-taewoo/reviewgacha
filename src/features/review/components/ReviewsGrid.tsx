import React from 'react'

// import { reviews } from '../consts'

import { ReviewCard } from './ReviewCard'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function ReviewsGrid() {
  const supabase = await getSupabaseServerClient()
  const { data: reviewsData, error } = await supabase.from('reviews').select().match({post_id: '1'})

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(reviewsData ?? []).map(review => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  )
}

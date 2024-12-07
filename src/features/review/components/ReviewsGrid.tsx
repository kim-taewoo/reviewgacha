import React from 'react'

import { reviews } from '../consts'

import { ReviewCard } from './ReviewCard'

export function ReviewsGrid() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map(review => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  )
}

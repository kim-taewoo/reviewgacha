'use client'

import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { Review } from '../types'

import { ReviewCard } from './ReviewCard'

interface Props {
  reviews: Review[]
}

export const ResponsiveReviewCards = ({ reviews }: Props) => {
  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  let columns = 1
  if (isMd) columns = 2
  if (isLg) columns = 3

  const reviewsEachColumn = Math.ceil(reviews.length / columns)

  return (
    <>
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="relative grid w-full gap-4 overflow-hidden">
          {reviews.slice(i * reviewsEachColumn, (i + 1) * reviewsEachColumn).map(review => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      ))}
    </>
  )
}

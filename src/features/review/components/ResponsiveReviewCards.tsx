'use client'

import { useMediaQuery } from 'usehooks-ts'

import { ReviewCard } from './ReviewCard'

interface Props {
  reviews: Review[]
}

export const ResponsiveReviewCards = ({ reviews }: Props) => {
  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')

  let columns = 1
  if (isMd) columns = 2
  if (isLg) columns = 3

  const reviewsEachColumn = Math.ceil(reviews.length / columns)

  console.log(isMd, isLg, reviewsEachColumn)

  return (
    <>
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="grid gap-4">
          {reviews.slice(i * reviewsEachColumn, (i + 1) * reviewsEachColumn).map(review => (
            <ReviewCard {...review} />
          ))}
        </div>
      ))}
    </>
  )
}

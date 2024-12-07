import { Star } from 'lucide-react'
import React from 'react'

interface ReviewCardProps {
  author: string
  rating: number
  date: string
  content: string
  image?: string
}

export function ReviewCard({
  author,
  rating,
  date,
  content,
  image,
}: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 text-foreground transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 overflow-hidden rounded-full bg-gray-200">
            {image
              ? (
                  <img
                    src={image}
                    alt={author}
                    className="size-full object-cover"
                  />
                )
              : (
                  <div className="flex size-full items-center justify-center bg-indigo-100 text-lg font-semibold text-indigo-600">
                    {author[0].toUpperCase()}
                  </div>
                )}
          </div>
          <div>
            <h3 className="font-semibold">{author}</h3>
            <p className="text-sm text-gray-500 opacity-80">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={18}
              className={
                index < rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }
            />
          ))}
        </div>
      </div>
      <p className="leading-relaxed opacity-70">{content}</p>
    </div>
  )
}

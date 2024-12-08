'use client'

import { ArrowLeft, Star } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export function ReviewForm({ postId }: { postId: string }) {
  const supabase = getSupabaseBrowserClient()

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (rating === 0) {
      setError('별점을 선택해주세요')
      return
    }
    if (!content.trim()) {
      setError('리뷰 내용을 입력해주세요')
      return
    }

    // onSubmit({
    //   author: author.trim(),
    //   rating,
    //   content: content.trim()
    // });

    // Save to database
    const { data, error } = await supabase
      .from('reviews')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      .insert({
        score: rating,
        content,
        post_id: postId,
      })


    // Reset form
    setContent('')
    setRating(0)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[400px] rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        <Link href={`/gachas/${postId}`}>
          <Button size="icon" variant="ghost"><ArrowLeft /></Button>
        </Link>
        리뷰 쓰기
      </h2>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-red-600">
          {error}
        </div>
      )}

      {/* <div className="mb-6">
        <label
          htmlFor="author"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Your Name
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your name"
        />
      </div> */}

      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          별점
        </label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setRating(index + 1)}
              onMouseEnter={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                size={24}
                className={`${
                  index < (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                } transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={6}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="어떤 경험을 했는지 써주세요!"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-md"
      >
        확인
      </Button>
    </form>
  )
}

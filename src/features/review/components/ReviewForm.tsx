'use client'

import { ArrowLeft, Star, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export function ReviewForm({ postId }: { postId: string }) {
  const supabase = getSupabaseBrowserClient()

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [content, setContent] = useState('')
  const [error, setError] = useState<{ type: 'rating' | 'content' | 'image' | null, message: string }>({ type: null, message: '' })
  const [fileList, setFileList] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError({ type: null, message: '' })

    if (rating === 0) {
      setError({ type: 'rating', message: '별점을 선택해주세요' })
      return
    }
    if (content.trim().length < 20) {
      setError({ type: 'content', message: '리뷰는 최소 20자 이상 작성해주세요' })
      return
    }
    if (content.trim().length > 50) {
      setError({ type: 'content', message: '리뷰는 최대 50자까지 작성 가능합니다' })
      return
    }

    // Save to database
    await supabase
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
    <form onSubmit={handleSubmit} className="flex size-full max-w-lg flex-col justify-between rounded-lg bg-white p-4">
      <div className="border-b-inherit pb-5">
        <Link href={`/gachas/${postId}`}>
          <Button size="icon" variant="ghost" className="mb-2">
            <ArrowLeft size={32} className="size-8" />
          </Button>
        </Link>
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">이번 스프린트는 어떠셨나요?</h2>

        <div className="mb-6">
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setRating(index + 1)}
                onMouseEnter={() => setHoverRating(index + 1)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <div className="flex flex-col items-center justify-center">
                  <Star
                    size={50}
                    className={`${
                      index < (hoverRating || rating)
                        ? 'fill-[#FF9E49] text-[#FF9E49]'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grow">
        <hr />
        <div className="mb-2 pt-4">
          <p className="pb-2 text-base">리뷰를 작성해주세요</p>
          <textarea
            id="content"
            value={content}
            onChange={(e) => {
              const newContent = e.target.value
              if (newContent.length <= 50) {
                setContent(newContent)
                setError({ type: null, message: '' })
              }
            }}
            rows={6}
            className={`w-full rounded-md border-2 p-4 focus:outline-none focus:ring-2 focus:ring-[#FF9E49] ${
              error.type === 'content' ? 'border-[#FF9E49] bg-yellow-50' : 'border-[#F1F1F1] bg-[#F1F1F1]'
            }`}
            placeholder="20자 이상 50자 이하로 어떤 경험을 했는지 작성해주세요 !"
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className={`${content.length > 50 ? 'text-red-500' : 'text-gray-500'}`}>
            {content.length}
            {' '}
            / 50자
          </span>
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            사진 첨부 (최대 3장)
          </label>
          <div className="flex flex-wrap gap-2">
            {fileList.map((image, index) => (
              <div key={index} className="relative size-24">
                <Image src={image} alt={`Uploaded image ${index + 1}`} layout="fill" objectFit="cover" className="rounded-md" />
                <button
                  type="button"
                  onClick={() => {}}
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {fileList.length < 3 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex size-24 items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600"
              >
                +
              </button>
            )}
          </div>
          <input
            id="file"
            type="file"
            name="file"
            ref={fileInputRef}
            onChange={(e) => {
              const files = [...e.target.files || []]
              if (files.length > 3) {
                toast.error('이미지는 최대 4장까지 첨부 가능합니다')
                return
              }
              setFileList(Array.from(e.target.files || []))
            }}
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>
      </div>

      {error.message && (
        <div className={`my-4 rounded-md p-3 ${
          error.type === 'rating' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
        }`}
        >
          {error.message}
        </div>
      )}

      <Button
        type="submit"
        className="mt-4 w-full rounded-md bg-[#FF9E49] py-2 text-white hover:bg-[#FF7E29] focus:ring-2 focus:ring-[#FF9E49] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
        // disabled={rating === 0 || content.trim().length < 20 || content.length > 50}
      >
        리뷰 등록하기
      </Button>
    </form>
  )
}

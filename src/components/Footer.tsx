'use client'

import { Pencil, Gift, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'

type Props = object

export function Footer({}: Props) {
  const router = useRouter()

  return (
    <footer className="fixed inset-x-0 bottom-0 mt-10 border-t border-gray-200 bg-white p-5 shadow-md ">
      <div className="flex w-full">
        <Button
          className="flex-1 flex-col items-center justify-center rounded-none bg-white py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
          onClick={() => router.push('/gachas/1/new')}
        >
          <Pencil className="mb-1 size-6" />
          리뷰 작성하기
        </Button>
        <Button
          className="flex-1 flex-col items-center justify-center rounded-none bg-white py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
          onClick={() => router.push('/gachas/1/gacha')}
        >
          <Gift className="mb-1 size-5" />
          가챠 뽑기
        </Button>
        <Button
          className="flex-1 flex-col items-center justify-center rounded-none bg-white py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 "
          onClick={() => router.push('')}
        >
          <Award className="mb-1 size-5" />
          내랭킹
        </Button>
      </div>
    </footer>
  )
}

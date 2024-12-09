'use client'

import { Pencil, Gift, Award } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'

type Props = object

export function Footer({}: Props) {
  const router = useRouter()
  const param = useParams()
  const pathname = usePathname()

  const footerData = [
    {
      label: '리뷰 작성하기',
      icon: Pencil,
      path: `/gachas/${param.id}/new`,
    },
    {
      label: '가챠 뽑기',
      icon: Gift,
      path: `/gachas/${param.id}/gacha`,
    },
    {
      label: '내 랭킹',
      icon: Award,
      path: `/ranking/${param.id}`,
    },
  ]

  return (
    <footer className="fixed inset-x-0 bottom-0 mt-10 border-t border-gray-200 bg-white p-5 shadow-md ">
      <div className="flex w-full">
        {footerData.map(({ label, icon: Icon, path }, index) => (
          <Button
            key={index}
            className={`flex-1 flex-col items-center justify-center rounded-none bg-white py-2 text-sm font-medium transition-colors hover:bg-white ${
              pathname === path ? 'text-[#FF9E49]' : 'text-gray-800'
            }`}
            onClick={() => router.push(path)}
          >
            <Icon className="mb-1 size-5" />
            {label}
          </Button>
        ))}
      </div>
    </footer>
  )
}

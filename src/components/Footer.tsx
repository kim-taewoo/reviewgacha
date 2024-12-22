import { Gift, MessageSquareText, Trophy } from "lucide-react"
import Link from "next/link"
import React from "react"

type Props = {
  pageParams: Promise<{ id: string }>
}

export async function Footer({ pageParams }: Props) {
  const postId = (await pageParams).id

  const footerData = [
    {
      label: "리뷰 작성하기",
      icon: MessageSquareText,
      path: `/gachas/${postId}/new`,
    },
    {
      label: "가챠 뽑기",
      icon: Gift,
      path: `/gachas/${postId}/gacha`,
    },
    {
      label: "내 랭킹",
      icon: Trophy,
      path: `/ranking/${postId}`,
    },
  ]

  return (
    <footer className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white p-5">
      <div className="mx-auto flex w-full max-w-4xl">
        {footerData.map(({ label, icon: Icon, path }, index) => (
          <Link prefetch={false} key={index} className="z-20 flex flex-1 flex-col items-center justify-center hover:text-primary" href={path}>
            <Icon className="mb-1 size-5" strokeWidth={1.5} />
            {label}
          </Link>
        ))}
      </div>
    </footer>
  )
}

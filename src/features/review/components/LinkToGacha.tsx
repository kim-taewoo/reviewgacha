"use client"

import { Button } from "@/components/ui/button"
import { Ticket } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Props {
  gachasLength: number
  postId: string
}

export const LinkToGacha = ({gachasLength, postId}: Props) => {
  if (gachasLength > 0) {
    return (
      <Link href={`/gachas/${postId}/gacha`}>
        <Button>
          <Ticket className="-rotate-45" />
          {' '}
          가챠 뽑기
          {' '}
          +
          {gachasLength}
        </Button>
      </Link>
    )
  }

  return (
    <Button onClick={() => {
      toast.error('가지고 있는 가챠권이 없습니다! 리뷰를 작성하거나 좋아요를 눌러 가챠권을 얻어보세요!')
    }}>
      <Ticket className="-rotate-45" />
      {' '}
      가챠 뽑기
      {' '}
      +0
    </Button>
  )
}

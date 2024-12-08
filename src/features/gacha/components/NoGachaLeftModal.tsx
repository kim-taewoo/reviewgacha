'use client'

import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export const NoGachaLeftModal = () => {
  // const { width, height } = useWindowSize()

  const navigate = useRouter()
  const param = useParams()

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>남은 가챠권이 없습니다!</DialogTitle>
          <DialogDescription>
            리뷰를 남기거나 다른 사용자들에게 대댓글과 좋아요를 눌러 가챠권을 얻어보세요!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => navigate.push(`/gachas/${param.id}`)}>돌아가기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
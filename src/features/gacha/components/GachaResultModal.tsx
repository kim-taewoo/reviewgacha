'use client'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
// import Confetti from 'react-confetti'
// import { useWindowSize } from 'usehooks-ts'

import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'

interface Props {
  result: string | null
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
  resetGacha: () => void
  ticketCount: number
}

export const GachaResultModal = ({ result, isOpenModal, setIsOpenModal, resetGacha, ticketCount }: Props) => {
  // const { width, height } = useWindowSize()

  const navigate = useRouter()
  const param = useParams()

  return (
    <>
      <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
        {result && (
          <>
            <DialogContent
              onClick={() => {
                resetGacha()
              }}
              className="flex flex-col items-center gap-8 rounded-lg p-6 shadow-lg sm:max-w-[335px]"
            >
              {/* <Confetti
                width={width}
                height={height}
                className="absolute inset-0 z-10"
              /> */}
              <DialogTitle className="flex items-center justify-center text-2xl font-bold text-[#1F2024]">
                축하합니다!
              </DialogTitle>
              <DialogDescription className="flex text-center text-[#1F2024]">
                요정들의 카드를 수집하여
                <br />
                추억을 쌓아보세요!
              </DialogDescription>
              <div className="flex justify-center">
                <Image src="/Card 1.png" alt="card image" width={158} height={195} className="rounded-lg shadow-lg" />
              </div>
              <DialogFooter className="flex w-full gap-4">
                {
                  ticketCount >= 0 && (
                    <Button
                      type="button"
                      onClick={() => {
                        resetGacha()
                      }}
                      className="w-full rounded-lg text-white"
                    >
                      다시뽑기
                    </Button>
                  )
                }

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    // 배포되면 url 수정하기
                    navigate.push(`http://localhost:3000/gachas/${param.id}`)
                    resetGacha()
                  }}
                  className="w-full border-2"
                >
                  되돌아가기
                </Button>
              </DialogFooter>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  )
}

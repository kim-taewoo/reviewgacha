'use client'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { DEFAULT_URL } from '@/constatns'

import { Gacha } from '../types'

interface Props {
  result: string | null
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
  resetGacha: () => void
  image_url: string
  unusedGachas: Gacha[]
}

export const GachaResultModal = ({ result, isOpenModal, setIsOpenModal, resetGacha, image_url, unusedGachas }: Props) => {
  const navigate = useRouter()
  const param = useParams()

  return (
    <>
      <Dialog
        open={isOpenModal}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            resetGacha()
          }
          setIsOpenModal(isOpen)
        }}
      >
        {result && (
          <>
            <DialogContent
              className="flex flex-col items-center gap-8 rounded-lg p-6 shadow-lg sm:max-w-[335px]"
            >
              <DialogTitle className="flex items-center justify-center text-2xl font-bold text-[#1F2024]">
                축하합니다!
              </DialogTitle>
              <DialogDescription className="flex text-center text-[#1F2024]">
                요정들의 카드를 수집하여
                <br />
                추억을 쌓아보세요!
              </DialogDescription>
              <div className="flex justify-center">
                <Image src={image_url} alt="card image" width={158} height={195} className="rounded-lg shadow-lg" />
              </div>
              <DialogFooter className="flex w-full gap-4">
                <Button
                  type="button"
                  onClick={() => {
                    resetGacha()
                  }}
                  className="w-full rounded-lg text-white"
                  disabled={unusedGachas?.length === 0}
                >
                  한번 더 뽑기
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    if (unusedGachas?.length === 0) {
                      resetGacha()
                    }
                    else {
                      navigate.push(`${DEFAULT_URL}/gachas/${param.id}`)
                      resetGacha()
                    }
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

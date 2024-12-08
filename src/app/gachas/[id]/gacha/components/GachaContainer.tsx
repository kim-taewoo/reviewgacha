'use client'
import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { GachaResult } from './GachaResult'

export const GachaContainer = () => {
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const onClickGacha = (index: number) => {
    if (isLoading) return

    setIsLoading(true)
    setResult(null)

    // 선택된 카드만 뒤집기
    setFlippedIndex(index)

    setTimeout(() => {
      // 선택된 카드에 대한 결과를 표시
      const selectedCard = cards[index]
      setResult(selectedCard)
      setIsLoading(false)
    }, 2000)

    setTimeout(() => {
      setIsOpenModal(true)
    }, 3000)
  }

  return (
    <>
      {/* 카드 목록 */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-yellow-200 to-blue-200">
        {/* 상단 텍스트 */}
        <p className="mb-[72px] text-2xl font-bold text-[#1F2024]">
          한 장의 카드를
          {' '}
          <br />
          {' '}
          선택해 주세요
        </p>

        {/* 카드 리스트 */}
        <div className="grid grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div key={index} onClick={() => onClickGacha(index)}>
              <div
                className={cn(
                  'relative h-44 w-32 transition-transform duration-700 transform-style-preserve-3d',
                  flippedIndex === index && 'rotate-y-180',
                  isLoading && 'pointer-events-none opacity-50'
                )}
              >
                {/* 로딩 스피너 */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                  </div>
                )}

                {/* 카드 뒷면 */}
                <div className="absolute flex cursor-pointer items-center justify-center shadow-md backface-hidden">
                  <Image src="/Card back.png" alt="card image" width={158} height={195} />
                </div>

                {/* 카드 앞면 */}
                <div className="absolute flex cursor-pointer items-center justify-center shadow-md backface-hidden rotate-y-180">
                  <Image src="/Card 1.png" alt="card image" width={158} height={195} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 결과 표시 */}
        <GachaResult result={result} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />

      </div>
      {/* 다른 사람의 결과 */}
      {/* <GachaAwrad /> */}
    </>
  )
}

const cards = ['카드1', '카드2', '카드3', '카드4']

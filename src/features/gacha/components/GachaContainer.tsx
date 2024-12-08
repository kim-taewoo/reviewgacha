'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { GachaResultModal } from './GachaResultModal'
import gacha, { GachaResult } from '../gacha'

export const GachaContainer = () => {
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const flipIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const [gachaResult, setGachaResult] = useState<GachaResult | null>(null)

  const onClickGacha = async (index: number) => {
    if (isLoading) return

    setIsLoading(true)
    setResult(null)

    // 선택된 카드만 뒤집기
    setFlippedIndex(index)

    const response = await gacha();
    if(!response) return;

    const randomIndex = Math.floor(Math.random() * response.length)
    setGachaResult(response[randomIndex])

    let flipState = true
    flipIntervalRef.current = setInterval(() => {
      flipState = !flipState
      setFlippedIndex(flipState ? index : null)
    }, 700)

    setTimeout(() => {
      if (flipIntervalRef.current) {
        clearInterval(flipIntervalRef.current)
        flipIntervalRef.current = null
      }
      // 선택된 카드에 대한 결과를 표시
      const selectedCard = cards[index]
      setResult(selectedCard)
      setIsLoading(false)
    }, 2000)

    setTimeout(() => {
      setIsOpenModal(true)
    }, 3000)
  }

  const resetGacha = () => {
    setFlippedIndex(null)
    setResult(null)
    setIsOpenModal(false)
    setIsLoading(false)
  }

  return (
    <>
      {/* 카드 목록 */}
      <div className="flex min-h-screen flex-col items-center justify-center">
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
                {/* 카드 뒷면 */}
                <div className="absolute flex cursor-pointer items-center justify-center shadow-md backface-hidden">
                  <Image src="/Card back.png" alt="card image" width={158} height={195} />
                </div>

                {/* 카드 앞면 */}
                <div className="absolute flex cursor-pointer items-center justify-center shadow-md backface-hidden rotate-y-180">
                  <Image src={gachaResult?.image_url || "/Card 1.png"} alt="card image" width={158} height={195} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 결과 표시 */}
        { gachaResult && <GachaResultModal result={result} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} resetGacha={resetGacha} image_url={gachaResult.image_url}/> }
      </div>
    </>
  )
}

const cards = ['카드1', '카드2', '카드3', '카드4']
'use client'
import { useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'usehooks-ts'

import { cn } from '@/lib/utils'

import { GachaCard } from './components/gacha-card'

const GachaPage = () => {
  const { width, height } = useWindowSize()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])

  const onClickGacha = () => {
    setIsLoading(true)
    setResult(null)
    setFlippedIndexes([])

    // 3초 후 결과 표시
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cards.length)
      const randomResult = cards[randomIndex]
      setResult(randomResult)
      setFlippedIndexes([randomIndex])
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="h-screen w-full bg-red-400">
      {result && <Confetti width={width} height={height} />}
      <header className="text-lg font-semibold">가챠권 페이지</header>

      {/* 카드 목록 */}
      <div className={cn(
        'flex flex-wrap justify-center gap-4 bg-gray-100 p-8',
        isLoading && 'pointer-events-none'
      )}
      >
        {cards.map((card, index) => (
          <GachaCard
            key={index}
            frontContent={card}
            backContent="뒷면"
            isLoading={isLoading}
            isFlipped={flippedIndexes.includes(index)}
          />
        ))}
      </div>

      {/* 결과 표시 */}
      {result && (
        <div className={cn(
          'fixed left-1/2 top-28 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-4 py-2 text-center text-black shadow-lg',
          'animate-fade-in'
        )}
        >
          🎉 당첨:
          {' '}
          {result}
          {' '}
          🎉
        </div>
      )}

      {/* 가챠 버튼 */}
      <button
        className={cn(
          'rounded-md bg-slate-600 px-3 py-2 text-white hover:bg-slate-700 disabled:opacity-50',
          isLoading && 'cursor-wait'
        )}
        onClick={onClickGacha}
        disabled={isLoading}
      >
        {isLoading ? '뽑는 중...' : '가챠권 뽑기'}
      </button>
      {/* 다른 사람의 결과 */}
      <div className="flex justify-between bg-yellow-300">
        <div>이미지?</div>
        <div>이달의 가챠 랭킹</div>
      </div>
    </div>
  )
}
export default GachaPage

const cards = ['카드1', '카드2', '카드3', '카드4', '카드5', '카드6', '카드7', '카드8', '카드9', '카드10', '카드11', '카드12']

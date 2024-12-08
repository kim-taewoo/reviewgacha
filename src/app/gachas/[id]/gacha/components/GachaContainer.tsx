'use client'
import { useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { GachaCard } from './GachaCard'

export const GachaContainer = () => {
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

  const sortedUsers = [...users].sort((a, b) => b.score - a.score) // 랭킹 순위

  return (
    <>
      {result && <Confetti width={width} height={height} />}
      <header className="text-lg font-semibold">가챠권 페이지</header>

      {/* 카드 목록 */}
      <div
        className={cn(
          'flex flex-wrap justify-center gap-4 bg-gray-100 h-56 overflow-hidden p-8 relative',
          isLoading && 'pointer-events-none'
        )}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={cn(
              'relative',
              index === 0 && 'ml-[-10%]',
              index === cards.length - 1 && 'mr-[-10%]'
            )}
          >
            <GachaCard
              frontContent={card}
              backContent="뒷면"
              isLoading={isLoading}
              isFlipped={flippedIndexes.includes(index)}
            />
          </div>
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
      <Button
        className={cn(
          'mx-auto mt-4 block',
          'text-sm sm:text-base lg:text-lg',
          isLoading && 'cursor-wait'
        )}
        onClick={onClickGacha}
        disabled={isLoading}
      >
        {isLoading ? '뽑는 중...' : '가챠권 뽑기'}
      </Button>
      {/* 다른 사람의 결과 */}
      <div className="flex justify-between bg-yellow-300">
        <div>이미지?</div>
        <div>
          <p>이달의 가챠 랭킹</p>
          <div className="mt-4">
            {sortedUsers.length > 0
              ? (
                  sortedUsers.map((user, index) => (
                    <div
                      key={user.userId}
                      className="flex justify-between border-b py-2 text-sm"
                    >
                      <span className="font-medium">
                        {index + 1}
                        .
                        {user.username}
                      </span>
                    </div>
                  ))
                )
              : (
                  <p>랭킹 데이터가 없습니다.</p>
                )}
          </div>
        </div>
      </div>
    </>
  )
}

const cards = ['카드1', '카드2', '카드3', '카드4', '카드5', '카드6', '카드7', '카드8', '카드9', '카드10', '카드11', '카드12']
const users = [
  {
    userId: 1,
    username: 'sunny',
    score: 10,
  },
  {
    userId: 2,
    username: 'zeroha',
    score: 90,
  },
  {
    userId: 3,
    username: 'minha',
    score: 70,
  },
  {
    userId: 4,
    username: 'dori',
    score: 60,
  },
  {
    userId: 5,
    username: 'noba',
    score: 100,
  },
]

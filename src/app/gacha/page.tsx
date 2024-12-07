'use client'
import { useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'usehooks-ts'

const GachaPage = () => {
  const { width, height } = useWindowSize()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const onClickGacha = () => {
    setIsLoading(true)
    setResult(null)

    // 3초 후 결과 표시
    setTimeout(() => {
      const randomResult = cards[Math.floor(Math.random() * cards.length)] // 랜덤 카드 선택
      setResult(randomResult)
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="h-screen w-full bg-red-400">
      {result && <Confetti width={width} height={height} />}
      <header className="text-lg font-semibold">가챠권 페이지</header>

      {/* 카드 목록 */}
      <div className={`flex space-x-6 bg-blue-400 ${isLoading ? 'animate-pulse' : ''}`}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex h-44 w-40 items-center justify-center bg-blue-800 text-center text-white ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            {isLoading ? '로딩 중...' : card}
          </div>
        ))}
      </div>

      {/* 결과 표시 */}
      {result && (
        <div className="fixed left-1/2 top-28 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-4 py-2 text-center text-black shadow-lg">
          🎉 당첨:
          {' '}
          {result}
          {' '}
          🎉
        </div>
      )}

      {/* 가챠 버튼 */}
      <button
        className="rounded-md bg-slate-600 px-3 py-2 text-white hover:bg-slate-700 disabled:opacity-50"
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

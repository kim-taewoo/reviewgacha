'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()

  const handleStart = () => {
    router.push('/gachas/1')
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f8f9ff]">
      {/* 이미지 배경 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/main.png"
          alt="Review Gacha"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* 텍스트와 버튼 */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 lg:p-12">
        {/* 텍스트 영역 */}
        <div className="mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg">
          <h1 className="mb-4 ml-20 inline-block bg-gradient-to-r from-[#FF9E49] to-[#FFD849] bg-clip-text text-2xl font-bold text-transparent sm:mb-6 sm:text-3xl md:mb-8 md:text-2xl">
            리뷰가챠!
          </h1>
          <div className="mr-40 text-center">
            <p className="text-lg font-medium sm:text-xl md:text-2xl">리뷰 쓰고 가차 뽑고</p>
            <p className="mr-14 text-lg font-medium sm:text-xl md:text-2xl">당신의 리뷰가</p>
            <p className="mr-6 text-lg font-medium sm:text-xl md:text-2xl">선물이 되는 순간!</p>
          </div>
        </div>

        {/* 버튼 영역 */}
        <Button
          onClick={handleStart}
          className="mx-auto h-[46px] w-full max-w-[335px] rounded-[8px] bg-[#FF9E49] py-4 text-base text-white hover:bg-[#FFD849] sm:py-6 sm:text-lg"
        >
          시작하기
        </Button>
      </div>
    </div>
  )
}

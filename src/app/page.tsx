import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#DEE9FE]">
      {/* 이미지 배경 */}
      <div className="absolute inset-0 mx-auto max-w-[375px] bg-cover bg-center bg-no-repeat px-3 pb-12 pt-7" style={{ backgroundImage: "url('/main.png')" }}>
        {/* 텍스트와 버튼 */}
        <div className="relative z-10 flex h-full flex-col items-center justify-between">
          {/* 텍스트 영역 */}
          <div className="mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg">
            <h1 className="mb-12 inline-block bg-gradient-to-r from-[#FF9E49] to-[#FFD849] bg-clip-text text-lg font-bold text-transparent sm:mb-6 sm:text-3xl md:mb-8 md:text-2xl">
              리뷰가챠!
            </h1>
            <div className="text-left">
              <p className="text-2xl font-medium">리뷰 쓰고 가챠 뽑고</p>
              <p className="text-2xl font-medium">당신의 리뷰가</p>
              <p className="text-2xl font-medium">선물이 되는 순간!</p>
            </div>
          </div>

          <Link href="/gachas/1" className="w-full">
            <Button
              className="mx-auto flex h-[46px] w-full max-w-[335px] justify-center rounded-[8px] bg-[#FF9E49] py-4 text-base text-white hover:bg-[#FFD849] sm:py-6 sm:text-lg"
            >
              시작하기
            </Button>
          </Link>

        </div>
      </div>

    </div>
  )
}

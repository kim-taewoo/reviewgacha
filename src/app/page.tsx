import Image from 'next/image'
// import { useRouter } from 'next/router'

import { Button } from '@/components/ui/button'

export default function Home() {
  // const router = useRouter()

  // const handleStart = () => {
  //   router.push({
  //     pathname: 'app/gachas/[id]', // 동적 라우트 경로
  //     query: { id: 1 }, // [id]에 전달될 값
  //   });
  // };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f8f9ff]">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/main.png"
          alt="Review Gacha"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="ml-56">
          <h1 className="mb-12 inline-block bg-gradient-to-r from-[#FF9E49] to-[#FFD849] bg-clip-text text-3xl font-bold text-transparent">
            리뷰가챠!
          </h1>
          <div className="text-left">
            <p className="text-xl font-medium">리뷰 쓰고 가차 뽑고</p>
            <p className="text-xl font-medium">당신의 리뷰가</p>
            <p className="text-xl font-medium">선물이 되는 순간!</p>
          </div>
        </div>
        <Button
          // onClick={handleStart}

          className="bottom-[716px] left-[20px] mx-auto h-[46px] w-[335px] rounded-[8px] bg-[#FF9E49] py-6 text-lg text-white hover:bg-[#FFD849]"
        >
          시작하기
        </Button>
      </div>
    </div>
  )
}

import Image from 'next/image'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { Review } from '@/features/review/types'

export const MyRanking = async ({ postId }: { postId: string }) => {
  const supabase = await getSupabaseServerClient()
  const { data: reviewsData } = await supabase.from('reviews').select().match({ post_id: postId }).order('created_at', { ascending: false })

  const reviews = reviewsData ?? [] as Review[]

  // 점수 순으로 정렬 & 50명 제한
  const sortedRankingData = [...reviews].sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 50)

  return (
    <div>
      <header className="flex flex-col space-y-2 p-4">
        <h5 className="text-sm font-normal text-[#71727A]">가챠권을 가장 많이 획득한</h5>
        <h1 className="text-2xl font-semibold">TOP 50</h1>
      </header>
      <div className="h-[calc(100vh-320px)] w-full space-y-4 overflow-y-scroll p-4">
        {sortedRankingData.map((data, index) => (
          <div key={`${index}_ranking`} className="flex items-center space-x-4">
            {/* 메달 또는 순위 표시 */}
            {index === 0 && (
              <Image src="/GoldMedal.png" alt="gold medal" width={32} height={32} />
            )}
            {index === 1 && (
              <Image src="/SilverMedal.png" alt="silver medal" width={32} height={32} />
            )}
            {index === 2 && (
              <Image src="/BronzeMedal.png" alt="bronze medal" width={32} height={32} />
            )}
            {index > 2 && (
              <span className="w-8 text-center text-lg font-semibold">{index + 1}</span>
            )}

            {/* 유저 프로필 이미지 */}
            {/* <div className="size-10 overflow-hidden rounded-full">
              <Image src={'/People.png'} alt={`user profile`} width={40} height={40} />
            </div> */}

            {/* 유저 닉네임과 점수 */}
            <div className="flex flex-col">
              <p className="font-bold text-[#333]">{data.username}</p>
              <p className="text-sm text-gray-600">
                {data.score}
                {' '}
                회
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import Image from 'next/image'

export const MyRanking = () => {
  // 점수 순으로 정렬 & 50명 제한
  const sortedRankingData = [...rankingData].sort((a, b) => b.score - a.score).slice(0, 50)

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
            <div className="size-10 overflow-hidden rounded-full bg-slate-100">
              {/* <Image src={data.userImage} alt={`${data.nickname} profile`} width={40} height={40} /> */}
            </div>

            {/* 유저 닉네임과 점수 */}
            <div className="flex flex-col">
              <p className="font-bold text-[#333]">{data.nickname}</p>
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

const rankingData = [
  { score: 120, userImage: '/user1.png', nickname: '짱구' },
  { score: 110, userImage: '/user2.png', nickname: '블루문' },
  { score: 105, userImage: '/user3.png', nickname: '스타더스트' },
  { score: 98, userImage: '/user4.png', nickname: '하이퍼' },
  { score: 95, userImage: '/user5.png', nickname: '드림캐처' },
  { score: 92, userImage: '/user6.png', nickname: '루나틱' },
  { score: 90, userImage: '/user7.png', nickname: '윈드밀' },
  { score: 88, userImage: '/user8.png', nickname: '코스모스' },
  { score: 85, userImage: '/user9.png', nickname: '디바인' },
  { score: 83, userImage: '/user10.png', nickname: '레이저' },
  { score: 80, userImage: '/user11.png', nickname: '썬더볼트' },
  { score: 78, userImage: '/user12.png', nickname: '버블티' },
  { score: 75, userImage: '/user13.png', nickname: '초코칩' },
  { score: 72, userImage: '/user14.png', nickname: '실버문' },
  { score: 70, userImage: '/user15.png', nickname: '골드스타' },
  { score: 68, userImage: '/user16.png', nickname: '로열티' },
  { score: 65, userImage: '/user17.png', nickname: '아이리스' },
  { score: 62, userImage: '/user18.png', nickname: '베이컨' },
  { score: 60, userImage: '/user19.png', nickname: '판다' },
  { score: 58, userImage: '/user20.png', nickname: '호크아이' },
  ...Array.from({ length: 40 }, (_, i) => ({
    score: 57 - i,
    userImage: `/user${21 + i}.png`,
    nickname: `유저${21 + i}`,
  })),
]

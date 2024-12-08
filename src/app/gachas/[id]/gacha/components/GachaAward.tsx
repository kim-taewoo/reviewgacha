export const GachaAwrad = () => {
  const sortedUsers = [...users].sort((a, b) => b.score - a.score) // 랭킹 순위

  return (
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
  )
}

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

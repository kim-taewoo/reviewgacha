import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ReviewsGrid } from '@/features/review/components/ReviewsGrid'
import { getSupabaseServerClient } from '@/lib/supabase/server'

type Params = Promise<{ id: string }>

export default async function ReviewsPage({ params }: { params: Params }) {
  const { id } = await params

  const supabase = await getSupabaseServerClient()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: sessionData, error: _sessionError } = await supabase.auth.getSession()
  const session = sessionData?.session
  const user = session?.user
  const { data: notUsedGachas, error } = await supabase.from('gachas').select().match({
    post_id: id,
    is_used: false,
    user_id: user?.id,
  })

  if (error) {
    console.error(error)
    return <div>에러가 발생했습니다</div>
  }

  return (
    <>
      <Header ticketCount={notUsedGachas.length} postId={id} />
      <div className="mb-14 flex w-full max-w-4xl flex-col gap-6 px-5 py-6">
        <h1 className="w-full text-xl font-semibold">
          테오 스프린트 후기를
          <br />
          확인해 보세요!
        </h1>
        <div className="mb-28 w-full">
          <ReviewsGrid postId={id} />
        </div>
      </div>
      <Footer />
    </>
  )
}

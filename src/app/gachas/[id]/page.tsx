// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Plus, Ticket } from 'lucide-react'
import Link from 'next/link'

import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { LinkToGacha } from '@/features/review/components/LinkToGacha'
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
      <div className="mb-32 w-full">
        <h1 className="my-5 text-center text-3xl font-bold">테오의 스프린트</h1>
        <div className="flex items-center justify-end gap-3">
          <div>
            <LinkToGacha gachasLength={notUsedGachas?.length || 0} postId={id} />
          </div>
          <div className="my-3 text-right">
            <Link href={`/gachas/${id}/new`}>
              <Button>
                <Plus />
                {' '}
                리뷰 작성하기
              </Button>
            </Link>
          </div>

        </div>
        <ReviewsGrid postId={id} />
      </div>
      <Footer />
    </>
  )
}

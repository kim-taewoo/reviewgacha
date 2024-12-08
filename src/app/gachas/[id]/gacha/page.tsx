import { GachaContainer } from '@/features/gacha/components/GachaContainer'
import { getSupabaseServerClient } from '@/lib/supabase/server'

type Params = Promise<{ id: string }>

const GachaPage = async ({ params }: { params: Params }) => {
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
    <div className="h-screen w-full bg-gradient-to-b from-yellow-200 to-blue-200">
      <GachaContainer ticketCount={notUsedGachas.length} />
    </div>
  )
}
export default GachaPage

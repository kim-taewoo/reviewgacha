import { GachaContainer } from '@/features/gacha/components/GachaContainer'
import { getSupabaseServerClient } from '@/lib/supabase/server'

const GachaPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = await getSupabaseServerClient()
  const { data: unusedGachas, error } = await supabase.from('gachas').select().match({
    is_used: false,
  })

  const { id: postId } = await params

  if (error) {
    console.error(error)
    return <div>에러가 발생했습니다</div>
  }

  return (
    <div className="h-screen w-full bg-gradient-to-b from-yellow-200 to-blue-200">
      <GachaContainer unusedGachas={unusedGachas} postId={postId} />
    </div>
  )
}
export default GachaPage

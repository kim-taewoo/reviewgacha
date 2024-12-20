import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { GachaContainer } from "@/features/gacha/components/GachaContainer"
import { getSupabaseServerClient } from "@/lib/supabase/server"

const GachaPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = await getSupabaseServerClient()
  const { data: unusedGachas, error } = await supabase.from("gachas").select().match({
    is_used: false,
  })

  const { id: postId } = await params

  if (error) {
    console.error(error)
    return <div>에러가 발생했습니다</div>
  }

  return (
    <div className="h-screen w-full bg-gradient-to-b from-yellow-200 to-blue-200">
      <Link href={`/gachas/${postId}`}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-5 top-5"
        >
          <ArrowLeft className="size-12" />
        </Button>
      </Link>
      <Link href={`/gachas/${postId}`}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-5 top-5"
        >
          <ArrowLeft className="size-12" />
        </Button>
      </Link>
      <GachaContainer unusedGachas={unusedGachas} postId={postId} />
    </div>
  )
}
export default GachaPage

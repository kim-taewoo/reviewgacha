'use client'

import { Star, ThumbsUp, MessageSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { revalidatePage } from '@/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import getDateForm from '@/utils/dateForm'

import { Review } from '../types'

import { ReviewImages } from './ReviewImages'

export function ReviewCard({
  created_at,
  id,
  media,
  score,
  username,
  content,
  post_id,
  liked_by_ids,
}: Review) {
  const supabase = getSupabaseBrowserClient()

  const [userId, setUserId] = useState<string>('')
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const getUserId = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData?.session
      const user = session?.user

      if (!user) return

      setUserId(user?.id)
      setLiked(liked_by_ids.includes(user.id))
    }

    getUserId()
  }, [supabase, liked_by_ids])

  const handleLike = async () => {
    if (!userId) return
    if (liked) {
      toast.error('이미 좋아요를 눌렀습니다 :)')
      return
    }

    liked_by_ids.push(userId)
    const { error } = await supabase.from('reviews').update({ liked_by_ids }).eq('id', id).eq('post_id', '1')
    if (error) {
      toast.error('서버에 오류가 있습니다. 잠시 후 다시 시도해주세요.')
      return
    }
    toast.success('좋아요가 반영되었습니다.')
    setLiked(true)
    revalidatePage(`/gachas/${post_id}`)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        {/* <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
          <AvatarFallback>:)</AvatarFallback>
        </Avatar> */}
        <div>
          <h3 className="text-lg font-semibold">{username}</h3>
          <div className="text-xs text-gray-400">{getDateForm(created_at)}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-0.5 text-yellow-400">
          {[...Array(score ?? 0)].map((_, i) => (
            <Star key={i} className="size-5 fill-current" />
          ))}
          {[...Array(5 - (score ?? 0))].map((_, i) => (
            <Star key={i} className="size-5 fill-none" />
          ))}
        </div>
        <div className="w-full text-wrap break-words text-muted-foreground">
          {/* <div className="break-words"> */}
          {content}
          {/* </div> */}
        </div>
        {(media?.imageUrls?.length ?? 0) > 0 && (
          <div className="mt-3">
            <ReviewImages imageUrls={media.imageUrls ?? []} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="gap-2 text-muted-foreground" onClick={() => toast.error('댓글 기능은 아직 구현되지 않았습니다 !')}>
          <MessageSquare />
          {0}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 ${liked ? 'text-red-500' : 'text-muted-foreground'}`}
          onClick={() => handleLike()}
        >
          <ThumbsUp className={`size-5 ${liked ? 'fill-current' : ''}`} />
          {liked_by_ids.length > 99 ? 99 : liked_by_ids.length}
        </Button>
      </CardFooter>
    </Card>
  )
}

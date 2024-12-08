'use client'

import { Star, ThumbsUp, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Review } from '@/features/gacha/types'
import getDateForm from '@/utils/dateForm'

export function ReviewCard({
  created_at,
  id,
  media,
  post_id,
  score,
  user_id,
  username,
  content,
}: Review) {
  const [liked, setLiked] = useState(false)
  console.log(score)
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
          <AvatarFallback>:)</AvatarFallback>
        </Avatar>
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
        <p className="text-muted-foreground">
          This product exceeded my expectations! The quality is outstanding, and it's incredibly easy to use. I would highly recommend it to anyone looking for a reliable solution.
          {/* {content} */}
        </p>
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
          onClick={() => setLiked(prev => !prev)}
        >
          <ThumbsUp className={`size-5 ${liked ? 'fill-current' : ''}`} />
          {liked ? 'Liked' : 'Like'}
        </Button>
      </CardFooter>
    </Card>
  )
}

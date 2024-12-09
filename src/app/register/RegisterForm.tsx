'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateUsernameAction } from '@/features/auth/actions'
import { cn } from '@/lib/utils'

export default function RegisterForm() {
  const [result, dispatchAction, isPending] = useActionState(
    updateUsernameAction,
    undefined
  )
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect_uri = searchParams.get('redirect_uri')

  const updatedUsername = result?.data?.username

  useEffect(() => {
    if (updatedUsername) {
      router.push(redirect_uri || '/')
    }
  }, [updatedUsername, redirect_uri, router])

  useEffect(() => {
    if (result?.error) {
      toast.error(result?.error ?? '에러가 발생했습니다 ㅠ')
    }
  }, [result?.error])

  return (
    <form className="flex flex-col gap-3" action={dispatchAction}>
      <Input name="username" type="text" placeholder="ex) 테오, 솔싹, 체다, 모승" />
      <Button type="submit" className={cn('w-full', isPending && 'opacity-75')} aria-disabled={isPending}>
        {isPending ? '등록중...' : '닉네임 등록하기'}
      </Button>
    </form>
  )
}

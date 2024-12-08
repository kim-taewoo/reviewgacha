'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'

export interface GachaResult {
  image_url: string
  reward_id: number
  reward_name: string
}

const PROBABILITIES = {
  special: 0.015,
  fairy: 0.30,
  normal: 1.00,
} as const

export async function getGachaResult(): Promise<GachaResult[] | null> {
  const supabase = await getSupabaseServerClient()

  const rand = Math.random()
  let type: 'special' | 'fairy' | 'normal' = 'normal'

  if (rand < PROBABILITIES.special) type = 'special'
  else if (rand < PROBABILITIES.special + PROBABILITIES.fairy) type = 'fairy'

  const { data: rewards, error } = await supabase.from('posts').select(`rewards->${type}`).single()
  if (!rewards || error) return null

  if (type === 'special' && 'special' in rewards) return rewards.special as unknown as GachaResult[]
  else if (type === 'fairy' && 'fairy' in rewards) return rewards.fairy as unknown as GachaResult[]
  else if (type === 'normal' && 'normal' in rewards) return rewards.normal as unknown as GachaResult[]
  else return null
}

export async function updateRewardId(gachaId: number, rewardId: number) {
  const supabase = await getSupabaseServerClient()

  await supabase.from('gachas').update({ reward_id: rewardId }).match({ id: gachaId })
}

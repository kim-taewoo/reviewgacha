import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export interface GachaResult {
  image_url: string
  reward_id: number
  reward_name: string
}

const PROBABILITIES = {
  special: 0.03,
  fairy: 0.30,
  normal: 1.00,
} as const

export async function getGachaResult(): Promise<GachaResult[] | null> {
  const supabase = getSupabaseBrowserClient()

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

import { getSupabaseServerClient } from "@/lib/supabase/server"

import { RewardsList } from "./RewardsList"

export type Reward = {
  image_url: string
  reward_id: number
  reward_name: string
}

export type Rewards = {
  fairy: Reward[]
  normal: Reward[]
  special: Reward[]
}

export const MyGacha = async () => {
  const supabase = await getSupabaseServerClient()

  const { data: rewardsList } = await supabase.from("posts").select("rewards").match({ id: 1 }).single()
  const { data: gachas } = await supabase.from("gachas").select("reward_id").match({
    post_id: 1,
    is_used: true,
  })
  const rewards = rewardsList?.rewards as Rewards

  const myRewardsIds = gachas?.map(gacha => gacha.reward_id) || []

  return (
    <RewardsList rewardsList={rewards} myRewardsIds={myRewardsIds} />
  )
}

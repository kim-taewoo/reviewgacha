import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export interface GachaResult {
  image_url: string
  reward_id: number
  reward_name: string
}

export default async function gacha(): Promise<GachaResult[] | null> {
  const supabase = getSupabaseBrowserClient();

  let type: "special"|"fairy"|"normal"

  const rand = Math.random()
  if (rand < 0.03) type = "special"
  else if (rand < 0.03 + 0.30) type = "fairy"
  else type = "normal"

  const {data: rewards, error} = await supabase.from("posts").select(`rewards->${type}`).single()
  if(!rewards || error) return null;

  if (type === "special" && "special" in rewards) return rewards.special as unknown as GachaResult[]
  else if (type === "fairy" && "fairy" in rewards) return rewards.fairy as unknown as GachaResult[]
  else if (type === "normal" && "normal" in rewards) return rewards.normal as unknown as GachaResult[]
  else return null
}



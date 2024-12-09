'use client'

import Image from 'next/image'
import { useState } from 'react'

import { type Rewards } from './MyGacha'

interface Props {
  rewardsList: Rewards
  myRewardsIds: (number | null)[]
}

const TAB_BUTTON: { value: 'all' | 'fairy' | 'normal', text: string }[] = [
  { value: 'all', text: '전체' },
  { value: 'fairy', text: '히든' },
  { value: 'normal', text: '기본' },
]

export const RewardsList = ({ rewardsList, myRewardsIds }: Props) => {
  const [activeTab, setActiveTab] = useState<'all' | 'fairy' | 'normal'>('all')

  const getRewardsList = () => {
    switch (activeTab) {
      case 'fairy':
        return rewardsList.fairy
      case 'normal':
        return rewardsList.normal
      default:
        return [...rewardsList.fairy, ...rewardsList.normal]
    }
  }

  return (
    <div>
      <div className="my-5 flex gap-3">
        {TAB_BUTTON.map(tab => (
          <button
            key={tab.value}
            className={`rounded-full border border-solid px-4 py-1 text-sm ${
              activeTab === tab.value
                ? 'bg-[#ff9e49] text-white'
                : 'border-[#ddd] text-[#8a8a8a]'
            }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.text}
          </button>
        ))}
      </div>

      <div
        className="grid gap-x-4 gap-y-6"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(108px, 1fr))' }}
      >
        {getRewardsList().map((reward) => {
          return (
            <div key={reward.reward_id} className="overflow-hidden rounded-md">
              <Image
                src={reward.image_url}
                alt={reward.reward_name}
                width={108}
                height={152}
                className={myRewardsIds.includes(reward.reward_id) ? '' : 'grayscale'}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

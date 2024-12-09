'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import { type Rewards } from './MyGacha'

interface Props {
  rewardsList: Rewards
  myRewardsIds: (number | null)[]
}

const TAB_BUTTON: { value: 'all' | 'special' | 'fairy' | 'normal', text: string }[] = [
  { value: 'all', text: '전체' },
  { value: 'special', text: '스페셜' },
  { value: 'fairy', text: '히든' },
  { value: 'normal', text: '기본' },
]

export const RewardsList = ({ rewardsList, myRewardsIds }: Props) => {
  const [activeTab, setActiveTab] = useState<'all' | 'special' | 'fairy' | 'normal'>('all')
  const [selectedReward, setSelectedReward] = useState<typeof rewardsList.special[0] | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const getRewardsList = () => {
    switch (activeTab) {
      case 'special':
        return rewardsList.special
      case 'fairy':
        return rewardsList.fairy
      case 'normal':
        return rewardsList.normal
      default:
        return [...rewardsList.special, ...rewardsList.fairy, ...rewardsList.normal]
    }
  }

  const handleRewardClick = (reward: typeof rewardsList.special[0]) => {
    if (myRewardsIds.includes(reward.reward_id)) {
      setSelectedReward(reward)
      setIsModalVisible(true)
      document.body.style.overflow = 'hidden'
    }
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
    setSelectedReward(null)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalVisible) {
        handleCloseModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalVisible])

  return (
    <div className="mb-20">
      <div className="my-5 flex gap-2">
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
          const isActive = myRewardsIds.includes(reward.reward_id)
          return (
            <div
              key={reward.reward_id}
              className={`overflow-hidden ${isActive ? 'cursor-pointer' : 'cursor-default'} justify-self-center`}
              onClick={() => handleRewardClick(reward)}
            >
              <Image
                src={reward.image_url}
                alt={reward.reward_name}
                // width={108}
                // height={152}
                // fill
                width={0}
                height={0}
                sizes="100%"
                style={{width:'100%', height:'auto'}}
                className={`${isActive ? 'transition-transform duration-300 ease-in-out hover:scale-105' : 'grayscale'} rounded-md`}
              />
            </div>
          )
        })}
      </div>

      {selectedReward && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleCloseModal}
        >
          <div
            className="relative"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={selectedReward.image_url}
              alt={selectedReward.reward_name}
              width={270}
              height={380}
              className="rounded-md"
            />
            <button
              className="absolute right-3 top-2 text-3xl font-bold text-white"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

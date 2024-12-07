import { cn } from '@/lib/utils'

interface GachaCardProps {
  frontContent: string
  backContent: string
  isLoading: boolean
  isFlipped: boolean
}

export const GachaCard = ({ frontContent, backContent, isLoading = false, isFlipped = false }: GachaCardProps) => {
  return (
    <div
      className={cn(
        'group relative h-44 w-40 perspective-1000',
        isLoading && 'pointer-events-none opacity-50'
      )}
    >
      {/* 카드 컨테이너 */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-gray-800 bg-opacity-5">
          <div className="size-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
        </div>
      )}
      <div
        className={cn(
          'size-full transition-transform duration-700 transform-style-preserve-3d',
          isFlipped && 'rotate-y-180'
        )}
      >
        {/* 카드 앞면 */}
        <div className="absolute flex size-full items-center justify-center rounded-lg bg-gradient-to-b from-[#504334] to-[#6F5D49] text-lg font-bold text-white shadow-lg backface-hidden">
          {frontContent}
        </div>

        {/* 카드 뒷면 */}
        <div className="absolute flex size-full items-center justify-center rounded-lg bg-gradient-to-b from-[#7F6A53] to-[#9C8468] text-lg font-bold text-white shadow-lg backface-hidden rotate-y-180">
          {backContent}
        </div>
      </div>
    </div>
  )
}

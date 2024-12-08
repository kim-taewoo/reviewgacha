import Image from 'next/image'

interface Props {
  imageUrls: string[]
}

export const ReviewImages = ({ imageUrls }: Props) => {
  if (imageUrls.length === 1) {
    return (
      <div className="relative min-h-48 w-full object-cover">
        <Image fill src={imageUrls[0]} alt="Review media" className="mt-4 h-48 w-full rounded-lg object-cover" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-1">
      {/* Each image wrapper maintains 1:1 aspect ratio */}
      {imageUrls.map((url, i) => (
        <div key={i} className="relative aspect-square">
          <Image
            src={url}
            alt="Review media"
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 50vw, 300px"
          />
        </div>
      ))}
    </div>
  )
}

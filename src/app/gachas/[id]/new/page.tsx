import { Suspense } from "react"

import { ReviewForm } from "@/features/review/components/ReviewForm"

type Params = Promise<{ id: string }>

export default async function NewReviewPage({ params }: { params: Params }) {
  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center">
      <Suspense fallback={null}>
        <ReviewForm />
      </Suspense>
    </div>
  )
}

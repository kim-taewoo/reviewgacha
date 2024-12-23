// import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from "next/cache"
import { Suspense } from "react"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/layout/header/Header"
import { Skeleton } from "@/components/ui/skeleton"
import { ReviewsGrid } from "@/features/review/components/ReviewsGrid"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getSupabasePublicClient } from "@/lib/supabase/public"

// dynamicIO 도입 이전 방식이라 주석처리 해놓음
// https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const supabase = getSupabasePublicClient()
  const { data: posts, error } = await supabase.from("posts").select("id")
  return (posts ?? []).map(post => ({
    id: String(post.id),
  }))
}

type Params = Promise<{ id: string }>

async function ReviewsPage({ params }: { params: Params }) {
  const postId = (await params).id
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <div className="mb-14 flex w-full max-w-4xl flex-col gap-6 px-5 py-6">
        <div className="flex items-end justify-between">
          <h1 className="text-xl font-semibold">
            테오 스프린트 후기를
            <br />
            확인해 보세요!
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            최근 업데이트:&nbsp;
            <span className="text-xs font-medium text-gray-700">{new Intl.DateTimeFormat("ko-KR", { dateStyle: "short", timeStyle: "short" }).format()}</span>
          </div>
        </div>
        <div className="mb-28 w-full">

          <Suspense fallback={(
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl bg-accent" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-accent" />
                    <Skeleton className="h-4 w-[200px] bg-accent" />
                  </div>
                </div>
              ))}
            </div>
          )}
          >
            <ReviewsGrid postId={postId} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={null}>
        <Footer pageParams={params} />
      </Suspense>
    </>
  )
}

const SuspensedReviewsPage = async ({ params }: { params: Params }) => {
  return (
    <Suspense>
      <ReviewsPage params={params} />
    </Suspense>
  )
}

export default SuspensedReviewsPage

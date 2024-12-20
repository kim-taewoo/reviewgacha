import { Suspense } from "react"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/layout/header/Header"
import { Skeleton } from "@/components/ui/skeleton"
import { ReviewsGrid } from "@/features/review/components/ReviewsGrid"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

// https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const supabase = getSupabaseBrowserClient()
  const { data: posts } = await supabase.from("posts").select("id")

  return (posts ?? []).map(post => ({
    id: String(post.id),
  }))
}

type Params = Promise<{ id: string }>

export default async function ReviewsPage({ params }: { params: Params }) {
  const id = (await params).id

  return (
    <>
      <Header postId={id} />
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
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          )}
          >
            <ReviewsGrid postId={id} />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  )
}

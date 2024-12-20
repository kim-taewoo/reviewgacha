import { LoadingCircle } from "@/components/LoadingCircle"

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 text-[#FF9E49]">
      <LoadingCircle className="text-[#FF9E49]" />
      <div>
        로딩중...
      </div>
    </div>
  )
}

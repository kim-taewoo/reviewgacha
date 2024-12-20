import { DEFAULT_URL } from "@/constatns"

import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: "REVIEW GACHA",
  description: "리뷰가챠로 리뷰를 더 즐겁게!",
}

export default function GachaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex size-full flex-1 flex-col items-center bg-[#f1f1f1]">
      {children}
    </div>
  )
}

import { DEFAULT_URL } from "@/constatns"

import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: "REVIEW GACHA",
  description: "리뷰가챠로 리뷰를 더 즐겁게!",
}

export default async function RankingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
    </>
  )
}

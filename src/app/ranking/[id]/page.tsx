import { Suspense } from "react"

// import { Footer } from "@/components/Footer"
import { Header } from "@/components/layout/header/Header"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { MyGacha } from "@/features/ranking/components/MyGacha"
import { MyRanking } from "@/features/ranking/components/MyRanking"

type Params = Promise<{ id: string }>

const RankingPage = async ({ params }: { params: Params }) => {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <div className="flex size-full max-w-4xl flex-1 flex-col items-center gap-20 p-5 pb-20">
        <Tabs defaultValue="myGacha" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="myGacha">내 가챠</TabsTrigger>
            <TabsTrigger value="myRanking">랭킹</TabsTrigger>
          </TabsList>
          <TabsContent value="myGacha">
            <Suspense fallback={null}>
              <MyGacha />
            </Suspense>
          </TabsContent>
          <TabsContent value="myRanking">
            <Suspense fallback={null}>
              <MyRanking />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
      {/* <Suspense fallback={null}>
        <Footer pageParams={params} />
      </Suspense> */}
    </>
  )
}

export default RankingPage

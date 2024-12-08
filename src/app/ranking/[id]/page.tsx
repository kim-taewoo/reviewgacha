import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

const RankingPage = () => {
  return (
    <div className="flex size-full h-full max-w-5xl flex-1 flex-col items-center gap-20 p-5">
      <Tabs defaultValue="myGacha" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="myGacha">내 가챠</TabsTrigger>
          <TabsTrigger value="myLanking">랭킹</TabsTrigger>
        </TabsList>
        <TabsContent value="myGacha">
          myGacha
        </TabsContent>
        <TabsContent value="myLanking">
          myLanking
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default RankingPage

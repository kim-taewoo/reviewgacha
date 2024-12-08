import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { MyRanking } from '@/features/ranking/components/MyRanking'

const RankingPage = () => {
  return (
    <Tabs defaultValue="myGacha" className="w-full">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="myGacha">내 가챠</TabsTrigger>
        <TabsTrigger value="myRanking">랭킹</TabsTrigger>
      </TabsList>
      <TabsContent value="myGacha">
        myGacha
      </TabsContent>
      <TabsContent value="myRanking">
        <MyRanking />
      </TabsContent>
    </Tabs>
  )
}
export default RankingPage

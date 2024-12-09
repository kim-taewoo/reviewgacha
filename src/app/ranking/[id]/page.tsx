import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { MyGacha } from '@/features/ranking/components/MyGacha'
import { MyRanking } from '@/features/ranking/components/MyRanking'
import { getSupabaseServerClient } from '@/lib/supabase/server'

type Params = Promise<{ id: string }>

const RankingPage = async ({ params }: { params: Params }) => {
  const { id } = await params

  const supabase = await getSupabaseServerClient()
  const { data: sessionData } = await supabase.auth.getSession()
  const session = sessionData?.session
  const user = session?.user

  const { data: notUsedGachas, error } = await supabase
    .from('gachas')
    .select()
    .match({
      post_id: id,
      is_used: false,
      user_id: user?.id,
    })

  if (error) {
    console.error(error)
    return <div>에러가 발생했습니다</div>
  }

  return (
    <>
      <Header ticketCount={notUsedGachas.length} postId={id} />
      <div className="flex size-full max-w-4xl flex-1 flex-col items-center gap-20 p-5 pb-20">
        <Tabs defaultValue="myGacha" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="myGacha">내 가챠</TabsTrigger>
            <TabsTrigger value="myRanking">랭킹</TabsTrigger>
          </TabsList>
          <TabsContent value="myGacha"><MyGacha /></TabsContent>
          <TabsContent value="myRanking">
            <MyRanking />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  )
}

export default RankingPage

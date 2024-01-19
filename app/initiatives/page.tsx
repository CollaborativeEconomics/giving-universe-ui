import { Card } from '@/components/ui/card'
import SearchBar from '@/components/search/SearchBar'
import InitiativeCard from '@/components/initiativeCard'
import { searchInitiatives } from '@/lib/utils/registry'

export default async function Initiatives(props: any) {
  const query = props?.searchParams?.query || ''
  const category = props?.searchParams?.category || ''
  const location = props?.searchParams?.location || ''
  console.log('SEARCH', query, category, location)
  const data = (await searchInitiatives(query, category, location)) || []
  //console.log('INITS', data.length)

  return (
    <main className="flex min-h-screen flex-col items-stretch container pt-24">
      <Card className="flex">
        <SearchBar />
      </Card>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pt-10">
        {data?.length > 0 ? (
          data.map((item: any) => <InitiativeCard key={item.id} data={item} />)
        ) : (
          <h1 className="m-4">No initiatives found</h1>
        )}
      </div>
    </main>
  )
}
